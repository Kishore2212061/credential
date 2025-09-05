// routes/verifierRoutes.js
import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { verifierAuth } from "../middleware/verifierAuth.js";
import { inviteVerifier, getStudentList, validateVerifierToken } from "../controllers/verifierController.js";
import { getCredentials, verifyCredential } from "../controllers/credentialController.js";

const router = express.Router();

router.post("/invite", auth(["organization"]), inviteVerifier);

router.get("/students", verifierAuth, getStudentList);

router.get("/students/:userId/credentials", verifierAuth, getCredentials);

router.get("/students/:userId/verify", verifierAuth, verifyCredential);

router.get("/validate", validateVerifierToken);

export default router;
