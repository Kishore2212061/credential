import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { upsertMyProfile, orgFillMissingProfile, getMyProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", auth(["user"]), getMyProfile);
router.put("/me", auth(["user"]), upsertMyProfile);
router.put("/fill-missing", auth(["organization"]), orgFillMissingProfile);

export default router;