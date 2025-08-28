import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  name: String,
  degree: String,
  branch: String,
  mode: String,
  registerNo: String,
  regulations: String,
}, { timestamps: true });

export default mongoose.model("UserDetail", userDetailSchema);