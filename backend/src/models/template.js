import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: String,
  html: { type: String, required: true },
  css: String,
    title: { type: String },    
  program: { type: String },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true }
}, { timestamps: true });

templateSchema.index({ name: 1, organization: 1 }, { unique: true });

export default mongoose.model("Template", templateSchema);