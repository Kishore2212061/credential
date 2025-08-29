import UserDetail from "../models/UserDetail.js";
import User from "../models/User.js";

// User edits own profile

export const upsertMyProfile = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const body = req.body; // {name, degree, branch, mode, registerNo, regulations}

    // upsert UserDetail
    const doc = await UserDetail.findOneAndUpdate(
      { user: req.user.id },
      { $set: { ...body, user: req.user.id } },
      { upsert: true, new: true }
    );

    // update User to reference this UserDetail
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { userDetail: doc._id } },
      { new: true }
    );

    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


// Organization fills missing fields for a user (only adds where empty)
export const orgFillMissingProfile = async (req, res) => {
  try {
    if (req.user.role !== "organization") return res.status(403).json({ message: "Forbidden" });
    const { userId, patch } = req.body; // patch = { field: value, ... }

    const user = await User.findById(userId);
    if (!user || String(user.organization) !== req.user.id) return res.status(404).json({ message: "User not found" });

    const existing = await UserDetail.findOne({ user: userId });
    const next = existing ? existing.toObject() : { user: userId };

    Object.keys(patch || {}).forEach(k => {
      if (!next[k] || next[k] === "") next[k] = patch[k];
    });

    const saved = await UserDetail.findOneAndUpdate(
      { user: userId },
      { $set: next },
      { upsert: true, new: true }
    );
    res.json(saved);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

// Get my profile
export const getMyProfile = async (req, res) => {
  try {
    if (req.user.role !== "user") return res.status(403).json({ message: "Forbidden" });
    const doc = await UserDetail.findOne({ user: req.user.id });
    res.json(doc || null);
  } catch (e) { res.status(500).json({ message: e.message }); }
};