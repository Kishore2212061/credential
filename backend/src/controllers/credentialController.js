import Credential from "../models/Credential.js";
import Template from "../models/Template.js";
import Semester from "../models/Semester.js";
import UserDetail from "../models/UserDetail.js";
import User from "../models/User.js";
import Organization from "../models/Organization.js";
import path from "path";
import fs from "fs/promises";
import puppeteer from "puppeteer";
import { renderPDF } from "../services/pdfService.js";
import { sha256OfFile, fileBytes } from "../services/hashService.js";
import { uploadBytesToIPFS } from "../services/ipfsService.js"; 
import {
  computeSeriesId,
  chainIssue,
  chainAddVersion,
  getIssuerAddress,
  chainGetVersion
} from "../services/chainService.js";
import { transporter } from "../utils/mailer.js"; 

export const issueCredential = async (req, res) => {
  try {
    console.log("✅ Starting credential issuance...");

    if (req.user.role !== "organization") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { userId, semesterNumber, templateId, subjectWallet } = req.body;

    const user = await User.findById(userId);
    if (!user || String(user.organization) !== req.user.id) {
      return res.status(404).json({ message: "User not found or not in your org" });
    }

    const sem = await Semester.findOne({ user: userId, semesterNumber });
    if (!sem || String(sem.organization) !== req.user.id) {
      return res.status(404).json({ message: "Semester not found or not in your org" });
    }

    const tpl = await Template.findOne({ _id: templateId, organization: req.user.id });
    if (!tpl) return res.status(404).json({ message: "Template not found" });

    const org = await Organization.findById(req.user.id);
    if (!org) return res.status(404).json({ message: "Organization not found" });

    const profile = await UserDetail.findOne({ user: userId });

    const data = {
      header: {
        college: org.name,
        program: tpl.program || "",
        title: tpl.title || tpl.name || "",
        slno: `A${String(sem._id).slice(-6).toUpperCase()}`,
      },
      candidate: {
        name: profile?.name || "",
        degreeBranch: `${profile?.degree || ""} ${profile?.branch ? profile.branch.toUpperCase() : ""}`.trim(),
        mode: profile?.mode || "",
        registerNo: profile?.registerNo || "",
        monthYearOfExam: sem.monthYearOfExam || "",
        regulations: profile?.regulations || "",
        dateOfPublication: sem.dateOfPublication ? new Date(sem.dateOfPublication).toLocaleDateString("en-GB") : "",
      },
      table: {
        semesterNumber: sem.semesterNumber,
        rows: sem.subjects.map((s) => ({
          semNo: sem.semesterNumber,
          code: s.subjectCode,
          title: s.subjectTitle,
          credits: s.credits,
          grade: s.grade,
          result: s.result,
        })),
      },
      result: {
        gpa: sem.gpa || "",
        cgpa: sem.cgpa || ""
      }
    };

    const tempDir = path.join(process.cwd(), "temp");
    await fs.mkdir(tempDir, { recursive: true });

    const tempPdfPath = path.join(tempDir, `credential_${Date.now()}.pdf`);
    console.log("📄 Rendering PDF to:", tempPdfPath);
    await renderPDF({ html: tpl.html, css: tpl.css, data, outPath: tempPdfPath });

    // Wait for file flush
    await new Promise(resolve => setTimeout(resolve, 100));

    console.log("🔑 Computing content hash...");
    const contentHash = await sha256OfFile(tempPdfPath);

    console.log("📄 Reading PDF bytes...");
    const pdfBytes = await fileBytes(tempPdfPath);

    console.log("🖼 Generating PNG preview using Puppeteer...");
    const previewPath = path.join(tempDir, `preview_${Date.now()}.png`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const renderedHtml = await renderPDF({ html: tpl.html, css: tpl.css, data, returnHtml: true });

    const bodyHandle = await page.$("body");
    const { height } = await bodyHandle.boundingBox();
    await page.setViewport({ width: 794, height: Math.ceil(height) });
    await bodyHandle.dispose();
    await page.setContent(renderedHtml, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: previewPath, fullPage: true });

    await browser.close();

    const previewBytes = await fs.readFile(previewPath);

    console.log("🌐 Uploading preview to IPFS...");
    const previewCid = await uploadBytesToIPFS(previewBytes);

    console.log("🌐 Uploading PDF to IPFS...");
    const pdfCid = await uploadBytesToIPFS(pdfBytes);

    console.log("📝 Creating metadata and uploading...");
    const metadata = {
      name: `${org.name} - ${tpl.title || tpl.name} (Sem ${sem.semesterNumber})`,
      description: `Official academic credential for ${profile?.name || "Student"} issued by ${org.name}.`,
      image: `https://ipfs.io/ipfs/${previewCid}`,      
      external_url: `https://ipfs.io/ipfs/${pdfCid}`,   
      attributes: [
        { trait_type: "Degree", value: profile?.degree || "" },
        { trait_type: "Branch", value: profile?.branch || "" },
        { trait_type: "Semester", value: sem.semesterNumber },
        { trait_type: "CGPA", value: sem.cgpa || "" }
      ]
    };

      const metadataBytes = Buffer.from(JSON.stringify(metadata));
    const metadataCid = await uploadBytesToIPFS(metadataBytes);

    console.log("⛓ Issuing NFT on chain...");
    const issuerAddr = getIssuerAddress();
    const seriesId = computeSeriesId({ issuer: issuerAddr, userId, semesterId: semesterNumber, templateId });
    const latest = await Credential.findOne({ seriesId }).sort({ version: -1 });
    const subjectAddr = subjectWallet || user.wallet;
    if (!subjectAddr) throw new Error("❌ Subject must have a wallet address");

    let txHash, newVersion;
    const tokenURI = `https://ipfs.io/ipfs/${pdfCid}`;

    if (!latest) {
      newVersion = 0;
      console.log(subjectAddr)
      const { txHash: issuedTx } = await chainIssue({ seriesId, subject: subjectAddr, metadataCid: tokenURI, contentHash });
      txHash = issuedTx;
    } else {
      newVersion = latest.version + 1;
      const { txHash: upgradedTx } = await chainAddVersion({ seriesId, metadataCid: tokenURI, contentHash });
      txHash = upgradedTx;
    }

    console.log("💾 Saving credential to database...");
    const credential = await Credential.create({
      user: userId,
      organization: req.user.id,
      semester: sem._id,
      template: tpl._id,
      pdfPath: tempPdfPath,
      cid: `https://ipfs.io/ipfs/${pdfCid}`,
      contentHash,
      seriesId,
      version: newVersion,
      latestVersion: newVersion,
      chain: {
        network: process.env.CHAIN_NAME || "sepolia",
        contract: "0x7AF681f97af11Fd5Ab9C395646dDc0553F704341",
        txHash,
        revoked: false,
      },
      subjectWallet: subjectAddr,
      metadataCid
    });

    await Credential.updateMany({ seriesId }, { $set: { latestVersion: newVersion } });

    console.log("✉ Sending credential via email...");
    await transporter.sendMail({
      from: `"${org.name} Admin" <${process.env.MAIL_FROM || "do.not.reply@example.com"}>`,
      to: user.email,
      subject: "Your Academic Credential",
      text: `Hello ${profile?.name || "Student"},\n\nAttached is your issued academic credential.\n\nBest regards,\n${org.name}`,
      attachments: [{ filename: "credential.pdf", path: tempPdfPath }]
    });

    // Cleanup
    try { await fs.unlink(tempPdfPath); } catch {}
    try { await fs.unlink(previewPath); } catch {}

    console.log("✅ Credential issued successfully!");
    return res.status(201).json({ message: "Credential minted and emailed", credential, tokenURI });

  } catch (err) {
    console.error("❌ Error issuing credential:", err);
    return res.status(500).json({ message: "Error issuing credential", error: err.message });
  }
};

export const listCredentials = async (req, res) => {
  try {
    let q = {};
    if (req.user.role === "user") {
      q.user = req.user.id;
    } else if (req.user.role === "organization") {
      q.organization = req.user.id;
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
    const creds = await Credential.find(q)
      .populate("semester template")
      .populate({
        path: "user",
        select: "email role wallet organization", 
        populate: {
          path: "userDetail",
          model: "UserDetail",
          select: "name degree branch registerNo mode regulations", 
        },
      });    
    res.json(creds);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getCredentials = async (req, res) => {
  try {

    const { userId } = req.params; 
    const q = {user:userId}
    console.log(userId)
    if (!q) {
      return res.status(400).json({ message: "userId is required" });
    }

    const creds = await Credential.find(q)
      .populate("semester template")
      .populate({
        path: "user",
        select: "email role wallet organization", 
        populate: {
          path: "userDetail",
          model: "UserDetail",
          select: "name degree branch registerNo mode regulations", 
        },
      }); 

      console.log(JSON.stringify(creds))

    res.json(creds);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export const verifyCredential = async (req, res) => {
  try {
    const { userId } = req.params; 
    console.log(userId)
    if (!userId) {
      return res.status(400).json({ message: "Credential id is required" });
    }

    const cred = await Credential.findById(userId)
       .populate("user semester template organization");
    if (!cred) {
      return res.status(404).json({ message: "Credential not found" });
    }

    // 2. Get latest version from chain
    const onChain = await chainGetVersion({
      seriesId: cred.seriesId,
      version: cred.version,
    });

    if (!onChain) {
      return res.status(404).json({ message: "On-chain record not found" });
    }

    console.log(JSON.stringify(onChain))

    const { contentHash, cid, issuedAt, revoked, issuer, subject } = onChain;

    // 3. Compare off-chain DB vs on-chain
    const isHashMatch = contentHash === cred.contentHash;
    const isCidMatch = cid === cred.cid;
    const isNotRevoked = !revoked;

    const isValid = isHashMatch && isCidMatch && isNotRevoked;

    return res.json({
      credentialId: cred._id,
      user: cred.user,
      seriesId: cred.seriesId,
      version: cred.version,
      onChain: {
        contentHash,
        cid,
        issuedAt,
        revoked,
        issuer,
        subject,
      },
      offChain: {
        contentHash: cred.contentHash,
        cid: cred.cid,
      },
      verified: isValid,
      mismatches: {
        hash: !isHashMatch,
        cid: !isCidMatch,
        revoked: revoked,
      },
    });
  } catch (err) {
    console.error("Error verifying credential:", err);
    return res.status(500).json({
      message: "Error verifying credential",
      error: err.message,
    });
  }
};