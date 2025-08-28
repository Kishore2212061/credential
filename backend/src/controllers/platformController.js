import bcrypt from "bcryptjs";
import Organization from "../models/Organization.js";

export const addOrganization = async (req, res) => {
  try {
    if (req.user.role !== "platform") return res.status(403).json({ message: "Forbidden" });
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const org = new Organization({ name, email, password: hashed });
    await org.save();
    res.json(org);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    if (req.user.role !== "platform") return res.status(403).json({ message: "Forbidden" });
    const orgs = await Organization.find({});
    res.json(orgs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};