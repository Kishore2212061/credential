import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ethers } from "ethers";
import Platform from "../models/Platform.js";
import Organization from "../models/Organization.js";
import User from "../models/User.js";

const SECRET = process.env.JWT_SECRET || "superset";

const modelByRole = (role) => {
  if (role === "platform") return Platform;
  if (role === "organization") return Organization;
  if (role === "user") return User;
  return null;
};

export const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const Model = modelByRole(role);
    if (!Model) return res.status(400).json({ message: "Invalid role" });

    const acc = await Model.findOne({ email });
    if (!acc) return res.status(404).json({ message: "Account not found" });

    const ok = await bcrypt.compare(password, acc.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    let privateKeyToReturn = null;

    if (role === "user" && !acc.wallet) {
      const wallet = ethers.Wallet.createRandom();
      acc.wallet = wallet.address;
      await acc.save();

      // Return private key ONLY ONCE
      privateKeyToReturn = wallet.privateKey;
      console.log(wallet.privateKey)
    }

    const token = jwt.sign({ id: acc._id, role }, SECRET, { expiresIn: "2h" });

    res.json({
      token,
      role,
      id: acc._id,
      wallet: acc.wallet || null,
      privateKey: privateKeyToReturn, 
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: e.message });
  }
};
