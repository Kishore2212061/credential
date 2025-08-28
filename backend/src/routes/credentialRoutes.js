import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { issueCredential, getCredentials, listCredentials, verifyCredential } from "../controllers/credentialController.js";

const router = express.Router();
router.post("/issue", auth(["organization"]), issueCredential);
router.get("/", auth(["user","organization"]), listCredentials);
router.get("/:userId", auth(["user","organization"]), getCredentials);
router.get("/:userId/verify", auth(["user","organization"]), verifyCredential);
export default router;