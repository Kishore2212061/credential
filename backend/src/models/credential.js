import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    pdfPath: String,

    visibility: { type: [String], default: ["user", "organization"] },

    seriesId: { type: String, index: true }, // Unique series identifier
    version: { type: Number, default: 1 }, // Each new update increments
    latestVersion: { type: Number, default: 1 }, // Track latest version in series

    cid: String, // IPFS/Web3.storage CID
    contentHash: String,
    chain: {
      network: String,
      contract: String,
      txHash: String,
      revoked: { type: Boolean, default: false },
    },

    subjectWallet: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Credential", credentialSchema);
