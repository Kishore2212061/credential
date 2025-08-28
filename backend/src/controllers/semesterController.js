import Semester from "../models/Semester.js";
import User from "../models/User.js";

// Org creates/updates a semester for a user
export const upsertSemester = async (req, res) => {
  try {
    if (req.user.role !== "organization") return res.status(403).json({ message: "Forbidden" });

    const { userId, semesterNumber, monthYearOfExam, dateOfPublication, subjects, gpa, cgpa } = req.body;

    const user = await User.findById(userId);
    if (!user || String(user.organization) !== req.user.id) return res.status(404).json({ message: "User not found" });

    const doc = await Semester.findOneAndUpdate(
      { user: userId, semesterNumber },
      { $set: { organization: req.user.id, monthYearOfExam, dateOfPublication, subjects, gpa, cgpa } },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// User/org get semesters for a user
export const listSemesters = async (req, res) => {
  try {
    const { userId } = req.params;
    const q = { user: userId };

    if (req.user.role === "user") {
      if (req.user.id !== userId) return res.status(403).json({ message: "Forbidden" });
    } else if (req.user.role === "organization") {
      const user = await User.findById(userId);
      if (!user || String(user.organization) !== req.user.id) return res.status(403).json({ message: "Forbidden" });
      q.organization = req.user.id;
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    const docs = await Semester.find(q).sort({ semesterNumber: 1 });
    res.json(docs);
  } catch (e) { res.status(500).json({ message: e.message }); }
};