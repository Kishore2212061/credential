import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { addOrganization, getOrganizations } from "../controllers/platformController.js";

const router = express.Router();

router.post("/organizations", auth(["platform"]), addOrganization);
router.get("/organizations", auth(["platform"]), getOrganizations);

export default router;