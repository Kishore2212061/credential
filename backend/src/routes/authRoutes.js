import express from "express";
import { login, loginWithKey } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", login);
router.post("/login-key", loginWithKey);
export default router;