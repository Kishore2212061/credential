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
      const hashedKey = await bcrypt.hash(wallet.privateKey, 10);
      acc.privateKey = hashedKey;
      acc.wallet = wallet.address;
      await acc.save();
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

export const loginWithKey = async (req, res) => {
  try {
    const { role = "user", privateKey } = req.body;
    const Model = modelByRole(role);
    if (!Model) return res.status(400).json({ message: "Invalid role" });
    if (!privateKey) return res.status(400).json({ message: "privateKey required" });

    // Derive wallet address from private key
    const wallet = new ethers.Wallet(privateKey);
    const acc = await Model.findOne({ wallet: wallet.address });
    if (!acc) return res.status(404).json({ message: "Account not found" });

    // If you hashed PK in DB, optionally check:
    if (acc.privateKey) {
      const ok = await bcrypt.compare(privateKey, acc.privateKey);
      if (!ok) return res.status(401).json({ message: "Invalid private key" });
    }

    const token = jwt.sign({ id: acc._id, role }, SECRET, { expiresIn: "2h" });
    return res.json({
      token,
      role,
      id: acc._id,
      wallet: acc.wallet || null,
      email: acc.email || null,
    });
  } catch (e) {
    console.error("loginWithKey error:", e);
    return res.status(500).json({ message: e.message });
  }
};
