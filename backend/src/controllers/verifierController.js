// controllers/verifierController.js
import VerifierInvite from "../models/verifierInvite.js";
import UserDetail from "../models/UserDetail.js";
import User from "../models/User.js";
import { transporter } from "../utils/mailer.js";
import crypto from "crypto";
import Organization from "../models/Organization.js";

export const inviteVerifier = async (req, res) => {
  try {
    const { companyName, companyEmail, students, durationHours } = req.body;
    const orgId = req.user.id; // from auth(["organization"])

    // get org details (optional if you want org name in mailer)
    const org = await Organization.findById(orgId);

    // generate unique token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);

    const invite = await VerifierInvite.create({
      organization: orgId,
      companyName,
      companyEmail,
      students, // [{ user, name, registerNo }]
      token,
      expiresAt,
    });

    const link = `${process.env.CLIENT_URL || "http://localhost:5173"}/verify?token=${token}`;

    await transporter.sendMail({
      from: `"${org?.organization?.name || "Organization"} Admin" <${
        process.env.MAIL_FROM || "do.not.reply@example.com"
      }>`,
      to: companyEmail,
      subject: "Verifier Invitation",
      text: `You have been invited to verify student credentials for ${companyName}.
      
      Access link (valid for ${durationHours} hours): ${link}`,
    });

    return res.json({ message: "Verifier invited", invite });
  } catch (err) {
    console.error("inviteVerifier error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getStudentList = async (req, res) => {
  try {
    const invite = await VerifierInvite.findById(req.verifierInvite._id).populate({
      path: "students.user",
      select: "email role wallet organization",
    });

    console.log(JSON.stringify(invite))

    // enrich with UserDetail
    const userIds = invite.students.map((s) => s.user?._id).filter(Boolean);

    const details = await UserDetail.find({ user: { $in: userIds } }).populate(
      "user",
      "email role wallet organization"
    );

    console.log(JSON.stringify(details))

    return res.json({ students: details });
  } catch (err) {
    console.error("getStudentList error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const validateVerifierToken = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).json({ valid: false, message: "Token required" });

    const invite = await VerifierInvite.findOne({ token });
    if (!invite) return res.status(401).json({ valid: false, message: "Invalid token" });

    if (invite.expiresAt < new Date()) {
      return res.status(403).json({ valid: false, message: "Token expired" });
    }

    return res.json({ valid: true, invite });
  } catch (err) {
    res.status(500).json({ valid: false, message: err.message });
  }
};
