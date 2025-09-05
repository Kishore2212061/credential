// middleware/verifierAuth.js
import VerifierInvite from "../models/verifierInvite.js";

export const verifierAuth = async (req, res, next) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(401).json({ message: "Token required" });

    const invite = await VerifierInvite.findOne({ token });

    if (!invite) return res.status(401).json({ message: "Invalid token" });

    if (invite.expiresAt < new Date()) {
      return res.status(403).json({ message: "Token expired" });
    }

    req.verifierInvite = invite;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
