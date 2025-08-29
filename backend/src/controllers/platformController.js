import bcrypt from "bcryptjs";
import Organization from "../models/Organization.js";
import { transporter } from "../utils/mailer.js";

export const addOrganization = async (req, res) => {
  try {
    if (req.user.role !== "platform")
      return res.status(403).json({ message: "Forbidden" });

    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const org = new Organization({ name, email, password: hashed });
    await org.save();

    await transporter.sendMail({
      from: '"Platform Admin" <do.not.reply.to.this.17@gmail.com>',
      to: email,
      subject: "Organization Account Created",
      text: `Hello ${name},\n\nYour organization account has been created.\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after first login.\n\nRegards,\nPlatform Team`,
    });

    res.json({ message: "Organization added and email sent.", org });
  } catch (e) {
    console.error(e);
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


// controllers/platformController.js
export const updateOrganization = async (req, res) => {
  try {
    if (req.user.role !== "platform") return res.status(403).json({ message: "Forbidden" });
    const { name, email, password } = req.body;
    const updateData = { name, email };
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }
    const org = await Organization.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(org);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteOrganization = async (req, res) => {
  try {
    if (req.user.role !== "platform") return res.status(403).json({ message: "Forbidden" });
    await Organization.findByIdAndDelete(req.params.id);
    res.json({ message: 'Organization deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
