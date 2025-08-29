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

    const { email, password } = req.body;

    // check if already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ generate wallet
    const wallet = ethers.Wallet.createRandom();

    // save user with wallet
    const user = new User({
      email,
      password: hashed,
      organization: req.user.id,
      wallet: wallet.address,
      privateKey: wallet.privateKey,
    });

    await user.save();

    // ✅ send password by email
    await transporter.sendMail({
      from: '"Organization Admin" <do.not.reply.to.this.17@gmail.com>',
      to: email,
      subject: "Your Account Password",
      text: `Your password is: ${password}\n\nPlease change it after first login.`,
    });

    res.json({
      id: user._id,
      email: user.email,
      wallet: user.wallet,
      message: "User created and password sent via email",
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
