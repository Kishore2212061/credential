import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { addUser, getUsers } from "../controllers/organizationController.js";

const router = express.Router();

router.post("/users", auth(["organization"]), addUser);
router.get("/users", auth(["organization"]), getUsers);

export default router;