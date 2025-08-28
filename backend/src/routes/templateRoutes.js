import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { createOrUpdateTemplate, getTemplate, listTemplates } from "../controllers/templateController.js";

const router = express.Router();
router.put("/", auth(["organization"]), createOrUpdateTemplate);
router.get("/", auth(["organization"]), listTemplates); 
router.get("/:id", auth(["organization"]), getTemplate);

export default router;