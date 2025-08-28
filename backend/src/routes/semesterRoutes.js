import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { upsertSemester, listSemesters } from "../controllers/semesterController.js";

const router = express.Router();
router.put("/", auth(["organization"]), upsertSemester);
router.get("/:userId", auth(["user","organization"]), listSemesters);

export default router;