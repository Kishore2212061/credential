import bcrypt from "bcryptjs";
import { ethers } from "ethers";
import User from "../models/User.js";
import UserDetail from "../models/UserDetail.js";
import { transporter } from "../utils/mailer.js"; // ⬅️ Import nodemailer transporter

export const addUser = async (req, res) => {
  try {
    if (req.user.role !== "organization") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { email, password, name, degree, branch, mode, registerNo, regulations } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashed,
      organization: req.user.id,
    });
    await user.save();

    // Always create a UserDetail (even if org doesn't send extra fields)
    const detail = await UserDetail.findOneAndUpdate(
      { user: user._id },
      {
        $set: {
          user: user._id,
          name: name || "",
          degree: degree || "",
          branch: branch || "",
          mode: mode || "",
          registerNo: registerNo || "",
          regulations: regulations || "",
        },
      },
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(user._id, { $set: { userDetail: detail._id } });

    await transporter.sendMail({
      from: '"Organization Admin" <do.not.reply.to.this.17@gmail.com>',
      to: email,
      subject: "Your Account Password",
      text: `Your password is: ${password}\n\nPlease change it after first login.`,
    });

    res.json({
      id: user._id,
      email: user.email,
      userDetail: detail, 
      message: "User created with UserDetail and password sent via email",
    });
  } catch (e) {
    console.error("Error adding user:", e);
    res.status(500).json({ message: e.message });
  }
};

export const getUsers = async (req, res) => {
  try {

    const users = await User.find({ organization: req.user.id });

const usersWithDetails = await Promise.all(
  users.map(async (u) => {
    const detail = await UserDetail.findOne({ user: u._id });
    return { ...u.toObject(), userDetail: detail };
  })
);

res.json(usersWithDetails);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
