import Credential from "../models/Credential.js";
import Template from "../models/Template.js";
import Semester from "../models/Semester.js";
import UserDetail from "../models/UserDetail.js";
import User from "../models/User.js";
import Organization from "../models/Organization.js";
import path from "path";
import fs from "fs/promises";

import { renderPDF } from "../services/pdfService.js";
import { sha256OfFile, fileBytes } from "../services/hashService.js";
import { uploadBytesToIPFS } from "../services/ipfsService.js"; // <- Pinata client
import {
  computeSeriesId,
  chainIssue,
  chainAddVersion,
  getIssuerAddress,
  chainLatestVersion,
  chainGetVersion
} from "../services/chainService.js";
import { isAddress } from "ethers";

export const issueCredential = async (req, res) => {
  try {
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
        degreeBranch: `${profile?.degree || ""} ${
          profile?.branch ? profile.branch.toUpperCase() : ""
        }`.trim(),
        mode: profile?.mode || "",
        registerNo: profile?.registerNo || "",
        monthYearOfExam: sem.monthYearOfExam || "",
        regulations: profile?.regulations || "",
        dateOfPublication: sem.dateOfPublication
          ? new Date(sem.dateOfPublication).toLocaleDateString("en-GB")
          : "",
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

    console.log(sem.gpa)

    const tempDir = path.join(process.cwd(), "temp");
    await fs.mkdir(tempDir, { recursive: true });
    const tempPath = path.join(tempDir, `credential_${Date.now()}.pdf`);

    await renderPDF({ html: tpl.html, css: tpl.css, data, outPath: tempPath });

    const hash = await sha256OfFile(tempPath);
    const pdfBytes = await fileBytes(tempPath);
    const ipfsCid = await uploadBytesToIPFS(pdfBytes);

    const issuerAddr = getIssuerAddress(); 
    console.log("Issuer:", issuerAddr);

    const seriesId = computeSeriesId({
      issuer: issuerAddr,
      userId,
      semesterId: semesterNumber,   
      templateId
    });

    console.log("Series ID:", seriesId);  
    if (!issuerAddr) {
      throw new Error("Issuer address not found for organization");
    }

    const latest = await Credential.findOne({ seriesId }).sort({ version: -1 });

    if (!subjectWallet && !user.wallet) {
      throw new Error("❌ Subject must have a wallet address to issue credential");
    }

    let txHash, newVersion;
    if (!latest) {
      newVersion = 0;
      const { txHash: hashIssued } = await chainIssue({
        seriesId,
        subject: subjectWallet || user.wallet,
        cid: ipfsCid,
        contentHash: hash,
      });
      txHash = hashIssued;
    } else {
      newVersion = latest.version + 1;
      const { txHash: hashUpgraded } = await chainAddVersion({
        seriesId,
        cid: ipfsCid,
        contentHash: hash,
      });
      txHash = hashUpgraded;
    }

    const credential = await Credential.create({
      user: userId,
      organization: req.user.id,
      semester: sem._id,
      template: tpl._id,
      pdfPath: tempPath,
      cid: ipfsCid,
      contentHash: hash,
      seriesId,
      version: newVersion,
      latestVersion: newVersion,
      chain: {
        network: process.env.CHAIN_NAME || "sepolia",
        contract: process.env.REGISTRY_CONTRACT || "0xC28Fa4CB113429d92248A7f7072F780E0133eed8",
        txHash,
        revoked: false,
      },
      subjectWallet: subjectWallet || user.wallet,
    });

    await Credential.updateMany({ seriesId }, { $set: { latestVersion: newVersion } });

    await fs.unlink(tempPath);

    return res.status(201).json({
      message: "✅ Credential issued successfully (on-chain)",
      credential,
    });
  } catch (err) {
    console.error("Error issuing credential:", err);
    return res
      .status(500)
      .json({ message: "Error issuing credential", error: err.message });
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