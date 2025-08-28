import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectCode: String,
  subjectTitle: String,
  credits: Number,
  grade: String,
  result: String
}, { _id: false });

const semesterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  semesterNumber: { type: Number, required: true },
  monthYearOfExam: String,
  dateOfPublication: { type: Date, required: true },
  subjects: [subjectSchema],
  gpa: Number,
  cgpa: Number
}, { timestamps: true });

semesterSchema.index({ user: 1, semesterNumber: 1 }, { unique: true });

export default mongoose.model("Semester", semesterSchema);