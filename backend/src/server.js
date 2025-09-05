import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import platformRoutes from "./routes/platformRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import semesterRoutes from "./routes/semesterRoutes.js";
import credentialRoutes from "./routes/credentialRoutes.js";
import verifierRoutes from "./routes/verifierRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*", // allow all origins (or replace with your frontend URL)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/platform", platformRoutes);
app.use("/organization", organizationRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/template", templateRoutes);
app.use("/semester", semesterRoutes);
app.use("/credential", credentialRoutes);
app.use("/verifier", verifierRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server on ${process.env.PORT || 5000}`)
  );
}).catch(console.error);