import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { addOrganization, getOrganizations, updateOrganization, deleteOrganization  } from "../controllers/platformController.js";

const router = express.Router();

router.post("/organizations", auth(["platform"]), addOrganization);
router.get("/organizations", auth(["platform"]), getOrganizations);
router.put("/organizations/:id", auth(["platform"]), updateOrganization);
router.delete("/organizations/:id", auth(["platform"]), deleteOrganization);

export default router;