// models/VerifierInvite.js
import mongoose from "mongoose";

const verifierInviteSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },

    students: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        registerNo: String,
      },
    ],

    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("VerifierInvite", verifierInviteSchema);
