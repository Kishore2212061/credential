import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
  wallet: { type: String, default: null }, // store only wallet address
  userDetail: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetail" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);

// 📌 Prompt to Generate Clean Frontend

// You are an expert frontend developer. I have already built my backend in Node.js + Express + MongoDB, and I now need you to build a clean frontend.

// 🔹 Tech Stack Requirements

// React (JavaScript only, not TypeScript)

// External CSS files (.css), not Tailwind CSS, not inline styles

// Keep the structure modular and clean (components, pages, services, context/store).

// Follow MVC-like separation: API calls in a /services folder.

// Use React Router for navigation.

// Use fetch or axios for API requests.

// 🔹 Backend Structure (Already Implemented)
// /backend
//  ┣ /src
//  ┃ ┣ /config
//  ┃ ┃ ┗ db.js
//  ┃ ┣ /middleware
//  ┃ ┃ ┗ auth.js
//  ┃ ┣ /models
//  ┃ ┃ ┣ Platform.js
//  ┃ ┃ ┣ Organization.js
//  ┃ ┃ ┣ User.js
//  ┃ ┃ ┣ UserDetail.js
//  ┃ ┃ ┣ Semester.js
//  ┃ ┃ ┣ Credential.js
//  ┃ ┃ ┗ Template.js
//  ┃ ┣ /controllers
//  ┃ ┃ ┣ authController.js
//  ┃ ┃ ┣ userController.js
//  ┃ ┃ ┣ orgController.js
//  ┃ ┃ ┗ credentialController.js
//  ┃ ┣ /routes
//  ┃ ┃ ┣ authRoutes.js
//  ┃ ┃ ┣ userRoutes.js
//  ┃ ┃ ┣ orgRoutes.js
//  ┃ ┃ ┗ credentialRoutes.js
//  ┃ ┣ /services
//  ┃ ┃ ┗ pdfService.js
//  ┃ ┗ server.js
//  ┣ package.json
//  ┗ .env

// 🔹 Entities & Features (Frontend Should Match This)
// 1. Authentication

// Register, Login, Logout

// JWT-based auth (store token in localStorage)

// Protected routes (redirect if not logged in)

// 2. User Management

// User Profile (basic info from /models/User.js)

// User Details Form (from /models/UserDetail.js)

// Show + Update details

// 3. Semester & Publications

// Semester model contains dateOfPublication

// Page to add / edit semester details

// Show all semesters for a user with their dateOfPublication

// 4. Organizations

// CRUD operations for organizations (/models/Organization.js)

// List of organizations with add/edit/delete

// 5. Credentials

// Manage credentials (/models/Credential.js)

// Upload / View generated PDFs (/services/pdfService.js)

// Credentials linked with User + Semester

// 6. Templates

// CRUD for templates (/models/Template.js)

// Used in credential generation

// 7. Platforms

// CRUD for platforms (/models/Platform.js)

// 🔹 Expected Frontend File Structure
// /frontend
//  ┣ /public
//  ┃ ┗ index.html
//  ┣ /src
//  ┃ ┣ /components
//  ┃ ┃ ┣ Navbar.js
//  ┃ ┃ ┣ Sidebar.js
//  ┃ ┃ ┗ ProtectedRoute.js
//  ┃ ┣ /pages
//  ┃ ┃ ┣ Login.js
//  ┃ ┃ ┣ Register.js
//  ┃ ┃ ┣ Dashboard.js
//  ┃ ┃ ┣ UserProfile.js
//  ┃ ┃ ┣ UserDetails.js
//  ┃ ┃ ┣ Semester.js
//  ┃ ┃ ┣ Organizations.js
//  ┃ ┃ ┣ Credentials.js
//  ┃ ┃ ┣ Templates.js
//  ┃ ┃ ┗ Platforms.js
//  ┃ ┣ /services
//  ┃ ┃ ┣ api.js (axios base instance)
//  ┃ ┃ ┣ authService.js
//  ┃ ┃ ┣ userService.js
//  ┃ ┃ ┣ semesterService.js
//  ┃ ┃ ┣ orgService.js
//  ┃ ┃ ┣ credentialService.js
//  ┃ ┃ ┗ templateService.js
//  ┃ ┣ /context
//  ┃ ┃ ┗ AuthContext.js
//  ┃ ┣ /styles
//  ┃ ┃ ┣ global.css
//  ┃ ┃ ┣ Navbar.css
//  ┃ ┃ ┣ Sidebar.css
//  ┃ ┃ ┣ Auth.css
//  ┃ ┃ ┣ Dashboard.css
//  ┃ ┃ ┗ Forms.css
//  ┃ ┣ App.js
//  ┃ ┣ index.js
//  ┗ package.json

// 🔹 Frontend Rules

// Keep UI clean, modern, responsive (pure CSS, flexbox/grid)

// Use form validation where needed

// Implement loading states + error handling for API calls

// Use modular components (reuse form inputs, buttons, tables)


// Perfect 👍 here’s a clean **`db.js`** you can drop into your `/src/config/` folder to handle MongoDB connection.

// ---

// ## 📌 `db.js`

// ```js
// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`❌ MongoDB Connection Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;
// ```

// ---

// ## 📌 Usage in `server.js`

// ```js
// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import platformRoutes from "./routes/platformRoutes.js";
// import organizationRoutes from "./routes/organizationRoutes.js";

// dotenv.config();
// connectDB(); // <--- Connect MongoDB

// const app = express();
// app.use(express.json());

// // Routes
// app.use("/auth", authRoutes);
// app.use("/platform", platformRoutes);
// app.use("/organization", organizationRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// ```

// ---

// ## 📌 Example `.env`

// ```
// MONGO_URI=mongodb://127.0.0.1:27017/onboardingdb
// JWT_SECRET=supersecretjwt
// PORT=5000
// ```

// ---

// ⚡ With this, your DB will connect automatically when `server.js` starts.

// 👉 Do you also want me to give you **MongoDB Compass / Atlas setup** instructions (so you can run locally or in cloud), or are you fine with just local MongoDB for now?



// Got it. Below is a **complete MVC backend** that plugs directly into your existing structure and adds what’s missing:

// * **JWT-only security**
// * **Onboarding**: Platform → Organization → User (kept)
// * **User Detail** (profile) – user can edit; organization can fill missing fields
// * **Semester** (multi-semester per user; **dateOfPublication** kept **only in Semester**)
// * **Template** (stored HTML/CSS with placeholders)
// * **Credential** (issue PDF from template; visibility restricted to issuing org + the user)

// I’m only adding new files and showing minimal edits to the ones you already have.

// ---

// # 📂 Final Structure (adds highlighted parts)

// ```
// /backend
//  ┣ /src
//  ┃ ┣ /config
//  ┃ ┃ ┗ db.js
//  ┃ ┣ /controllers
//  ┃ ┃ ┣ platformController.js
//  ┃ ┃ ┣ organizationController.js
//  ┃ ┃ ┣ userController.js
//  ┃ ┃ ┣ authController.js              ← NEW
//  ┃ ┃ ┣ templateController.js          ← NEW
//  ┃ ┃ ┣ semesterController.js          ← NEW
//  ┃ ┃ ┗ credentialController.js        ← NEW
//  ┃ ┣ /models
//  ┃ ┃ ┣ Platform.js
//  ┃ ┃ ┣ Organization.js
//  ┃ ┃ ┣ User.js
//  ┃ ┃ ┣ UserDetail.js                  ← NEW
//  ┃ ┃ ┣ Semester.js                    ← NEW
//  ┃ ┃ ┣ Template.js                    ← NEW
//  ┃ ┃ ┗ Credential.js                  ← NEW
//  ┃ ┣ /routes
//  ┃ ┃ ┣ platformRoutes.js
//  ┃ ┃ ┣ organizationRoutes.js
//  ┃ ┃ ┣ userRoutes.js
//  ┃ ┃ ┣ authRoutes.js                  ← NEW
//  ┃ ┃ ┣ templateRoutes.js              ← NEW
//  ┃ ┃ ┣ semesterRoutes.js              ← NEW
//  ┃ ┃ ┗ credentialRoutes.js            ← NEW
//  ┃ ┣ /middleware
//  ┃ ┃ ┗ authMiddleware.js              ← (make active; JWT-only)
//  ┃ ┣ /services
//  ┃ ┃ ┗ pdfService.js                  ← NEW
//  ┃ ┗ server.js
//  ┣ /uploads                            ← PDFs stored here (or swap for cloud)
//  ┣ package.json
//  ┗ .env
// ```

// ---

// ## 🔐 `/src/middleware/authMiddleware.js`

// ```js
// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET;

// export const auth = (roles = []) => {
//   return (req, res, next) => {
//     const h = req.headers.authorization || "";
//     const token = h.startsWith("Bearer ") ? h.slice(7) : null;
//     if (!token) return res.status(401).json({ message: "No token" });

//     try {
//       const decoded = jwt.verify(token, SECRET); // { id, role }
//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ message: "Forbidden" });
//       }
//       req.user = decoded;
//       next();
//     } catch (e) {
//       return res.status(401).json({ message: "Invalid/expired token" });
//     }
//   };
// };
// ```

// ---

// ## 👤 `/src/models/UserDetail.js`

// *(Basic profile fields; org allowed to fill missing)*

// ```js
// import mongoose from "mongoose";

// const userDetailSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
//   name: String,
//   degree: String,
//   branch: String,
//   mode: String,
//   registerNo: String,
//   regulations: String,              // optional – used on grade sheet header
//   // Note: dateOfPublication belongs ONLY to Semester
// }, { timestamps: true });

// export default mongoose.model("UserDetail", userDetailSchema);
// ```

// ---

// ## 📚 `/src/models/Semester.js`

// \*(Multi-semester; subjects array; **dateOfPublication here only**)

// ```js
// import mongoose from "mongoose";

// const subjectSchema = new mongoose.Schema({
//   subjectCode: String,
//   subjectTitle: String,
//   credits: Number,
//   grade: String,
//   result: String
// }, { _id: false });

// const semesterSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
//   semesterNumber: { type: Number, required: true },         // e.g., 5
//   monthYearOfExam: String,                                   // e.g., "NOV. 2024"
//   dateOfPublication: { type: Date, required: true },         // ← kept ONLY here
//   subjects: [subjectSchema],
//   gpa: Number,                                               // optional
//   cgpa: Number                                               // optional (computed elsewhere)
// }, { timestamps: true });

// semesterSchema.index({ user: 1, semesterNumber: 1 }, { unique: true });

// export default mongoose.model("Semester", semesterSchema);
// ```

// ---

// ## 🧩 `/src/models/Template.js`

// ```js
// import mongoose from "mongoose";

// const templateSchema = new mongoose.Schema({
//   name: { type: String, unique: true, required: true },  // e.g., "NEC Grade Sheet v1"
//   description: String,
//   html: { type: String, required: true },                // Handlebars HTML with placeholders
//   css: String
// }, { timestamps: true });

// export default mongoose.model("Template", templateSchema);
// ```

// ---

// ## 🎓 `/src/models/Credential.js`

// ```js
// import mongoose from "mongoose";

// const credentialSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
//   semester: { type: mongoose.Schema.Types.ObjectId, ref: "Semester", required: true },
//   template: { type: mongoose.Schema.Types.ObjectId, ref: "Template", required: true },
//   pdfPath: String,                         // or cloud URL
//   visibility: { type: [String], default: ["user", "organization"] } // fixed now
// }, { timestamps: true });

// credentialSchema.index({ user: 1, semester: 1 }, { unique: true });

// export default mongoose.model("Credential", credentialSchema);
// ```

// ---

// ## 🔑 `/src/controllers/authController.js`

// *(Login for all roles; generate JWT)*

// ```js
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import Platform from "../models/Platform.js";
// import Organization from "../models/Organization.js";
// import User from "../models/User.js";

// const SECRET = process.env.JWT_SECRET;

// const modelByRole = (role) => {
//   if (role === "platform") return Platform;
//   if (role === "organization") return Organization;
//   if (role === "user") return User;
//   return null;
// };

// export const login = async (req, res) => {
//   try {
//     const { role, email, password } = req.body;
//     const Model = modelByRole(role);
//     if (!Model) return res.status(400).json({ message: "Invalid role" });

//     const acc = await Model.findOne({ email });
//     if (!acc) return res.status(404).json({ message: "Account not found" });

//     const ok = await bcrypt.compare(password, acc.password);
//     if (!ok) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: acc._id, role }, SECRET, { expiresIn: "2h" });
//     res.json({ token, role, id: acc._id });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };
// ```

// ---

// ## 👥 `/src/controllers/userController.js` (extend with profile logic)

// ```js
// import UserDetail from "../models/UserDetail.js";

// // User edits own profile
// export const upsertMyProfile = async (req, res) => {
//   try {
//     if (req.user.role !== "user") return res.status(403).json({ message: "Forbidden" });

//     const body = req.body; // {name, degree, branch, mode, registerNo, regulations}
//     const doc = await UserDetail.findOneAndUpdate(
//       { user: req.user.id },
//       { $set: { ...body, user: req.user.id } },
//       { upsert: true, new: true }
//     );
//     res.json(doc);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// // Organization fills missing fields for a user (only adds where empty)
// export const orgFillMissingProfile = async (req, res) => {
//   try {
//     if (req.user.role !== "organization") return res.status(403).json({ message: "Forbidden" });
//     const { userId, patch } = req.body; // patch = { field: value, ... }

//     const existing = await UserDetail.findOne({ user: userId });
//     const next = existing ? existing.toObject() : { user: userId };

//     Object.keys(patch || {}).forEach(k => {
//       if (!next[k] || next[k] === "") next[k] = patch[k];
//     });

//     const saved = await UserDetail.findOneAndUpdate(
//       { user: userId },
//       { $set: next },
//       { upsert: true, new: true }
//     );
//     res.json(saved);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// // Get my profile
// export const getMyProfile = async (req, res) => {
//   try {
//     if (req.user.role !== "user") return res.status(403).json({ message: "Forbidden" });
//     const doc = await UserDetail.findOne({ user: req.user.id });
//     res.json(doc || null);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };
// ```

// ---

// ## 🗓️ `/src/controllers/semesterController.js`

// ```js
// import Semester from "../models/Semester.js";

// // Org creates/updates a semester for a user
// export const upsertSemester = async (req, res) => {
//   try {
//     if (req.user.role !== "organization") return res.status(403).json({ message: "Forbidden" });

//     const { userId, semesterNumber, monthYearOfExam, dateOfPublication, subjects, gpa, cgpa } = req.body;

//     const doc = await Semester.findOneAndUpdate(
//       { user: userId, semesterNumber },
//       { $set: { organization: req.user.id, monthYearOfExam, dateOfPublication, subjects, gpa, cgpa } },
//       { upsert: true, new: true }
//     );
//     res.json(doc);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// // User/org get semesters for a user
// export const listSemesters = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (req.user.role === "user" && req.user.id !== userId) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     // org can view semesters only for users it owns; enforce if needed:
//     const q = { user: userId };
//     const docs = await Semester.find(q).sort({ semesterNumber: 1 });
//     res.json(docs);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };
// ```

// ---

// ## 🧱 `/src/controllers/templateController.js`

// ```js
// import Template from "../models/Template.js";

// export const createOrUpdateTemplate = async (req, res) => {
//   try {
//     if (req.user.role !== "platform" && req.user.role !== "organization")
//       return res.status(403).json({ message: "Forbidden" });

//     const { name, description, html, css } = req.body;
//     const t = await Template.findOneAndUpdate(
//       { name },
//       { $set: { description, html, css } },
//       { upsert: true, new: true }
//     );
//     res.json(t);
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// export const getTemplate = async (req, res) => {
//   const t = await Template.findById(req.params.id);
//   res.json(t);
// };
// ```

// ---

// ## 🖨️ `/src/services/pdfService.js`

// ```js
// import puppeteer from "puppeteer";
// import handlebars from "handlebars";
// import fs from "fs";
// import path from "path";

// export const renderPDF = async ({ html, css, data, outPath }) => {
//   // inline CSS
//   const pageHtml = `
//     <html>
//       <head><meta charset="utf-8"><style>${css || ""}</style></head>
//       <body>${handlebars.compile(html)(data)}</body>
//     </html>`;

//   const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
//   const page = await browser.newPage();
//   await page.setContent(pageHtml, { waitUntil: "networkidle0" });

//   await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
//   await page.pdf({ path: outPath, format: "A4", printBackground: true });
//   await browser.close();
//   return outPath;
// };
// ```

// ---

// ## 📄 `/src/controllers/credentialController.js`

// ```js
// import Credential from "../models/Credential.js";
// import Template from "../models/Template.js";
// import Semester from "../models/Semester.js";
// import UserDetail from "../models/UserDetail.js";
// import { renderPDF } from "../services/pdfService.js";
// import path from "path";

// export const issueCredential = async (req, res) => {
//   try {
//     if (req.user.role !== "organization") return res.status(403).json({ message: "Forbidden" });

//     const { userId, semesterNumber, templateId } = req.body;

//     const sem = await Semester.findOne({ user: userId, semesterNumber });
//     if (!sem) return res.status(404).json({ message: "Semester not found" });

//     const tpl = await Template.findById(templateId);
//     if (!tpl) return res.status(404).json({ message: "Template not found" });

//     const profile = await UserDetail.findOne({ user: userId });

//     // Build data for template (matches your grade sheet layout)
//     const data = {
//       header: {
//         college: "NATIONAL ENGINEERING COLLEGE",
//         program: "B.E Degree Examinations",
//         title: "GRADE SHEET",
//         slno: `A${String(sem._id).slice(-6).toUpperCase()}`
//       },
//       candidate: {
//         name: profile?.name || "",
//         degreeBranch: `${profile?.degree || ""} ${profile?.branch ? profile.branch.toUpperCase() : ""}`.trim(),
//         mode: profile?.mode || "",
//         registerNo: profile?.registerNo || "",
//         monthYearOfExam: sem.monthYearOfExam || "",
//         regulations: profile?.regulations || "",
//         dateOfPublication: sem.dateOfPublication ? new Date(sem.dateOfPublication).toLocaleDateString("en-GB") : ""
//       },
//       table: {
//         semesterNumber: sem.semesterNumber,
//         rows: sem.subjects.map(s => ({
//           semNo: sem.semesterNumber,
//           code: s.subjectCode,
//           title: s.subjectTitle,
//           credits: s.credits,
//           grade: s.grade,
//           result: s.result
//         }))
//       }
//     };

//     const outPath = path.join("uploads", `${userId}_sem${sem.semesterNumber}.pdf`);
//     await renderPDF({ html: tpl.html, css: tpl.css, data, outPath });

//     const cred = await Credential.findOneAndUpdate(
//       { user: userId, semester: sem._id },
//       { $set: { user: userId, organization: req.user.id, semester: sem._id, template: templateId, pdfPath: outPath } },
//       { upsert: true, new: true }
//     );

//     res.json({ message: "Credential issued", credential: cred });
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };

// // Access control: only user or issuing org can fetch
// export const getCredentialPdfMeta = async (req, res) => {
//   try {
//     const { id } = req.params; // credential id
//     const c = await Credential.findById(id);
//     if (!c) return res.status(404).json({ message: "Not found" });

//     const isUser = req.user.role === "user" && String(req.user.id) === String(c.user);
//     const isOrg  = req.user.role === "organization" && String(req.user.id) === String(c.organization);
//     if (!isUser && !isOrg) return res.status(403).json({ message: "Forbidden" });

//     res.json({ pdfPath: c.pdfPath });
//   } catch (e) { res.status(500).json({ message: e.message }); }
// };
// ```

// ---

// ## 🛣️ Routes

// ### `/src/routes/authRoutes.js`

// ```js
// import express from "express";
// import { login } from "../controllers/authController.js";
// const router = express.Router();

// router.post("/login", login);
// export default router;
// ```

// ### `/src/routes/userRoutes.js` (append)

// ```js
// import express from "express";
// import { auth } from "../middleware/authMiddleware.js";
// import { upsertMyProfile, orgFillMissingProfile, getMyProfile } from "../controllers/userController.js";

// const router = express.Router();

// router.get("/me", auth(["user"]), getMyProfile);
// router.put("/me", auth(["user"]), upsertMyProfile);
// router.put("/fill-missing", auth(["organization"]), orgFillMissingProfile);

// export default router;
// ```

// ### `/src/routes/semesterRoutes.js`

// ```js
// import express from "express";
// import { auth } from "../middleware/authMiddleware.js";
// import { upsertSemester, listSemesters } from "../controllers/semesterController.js";

// const router = express.Router();
// router.put("/", auth(["organization"]), upsertSemester);
// router.get("/:userId", auth(["user","organization"]), listSemesters);

// export default router;
// ```

// ### `/src/routes/templateRoutes.js`

// ```js
// import express from "express";
// import { auth } from "../middleware/authMiddleware.js";
// import { createOrUpdateTemplate, getTemplate } from "../controllers/templateController.js";

// const router = express.Router();
// router.put("/", auth(["platform","organization"]), createOrUpdateTemplate);
// router.get("/:id", auth(["platform","organization"]), getTemplate);

// export default router;
// ```

// ### `/src/routes/credentialRoutes.js`

// ```js
// import express from "express";
// import { auth } from "../middleware/authMiddleware.js";
// import { issueCredential, getCredentialPdfMeta } from "../controllers/credentialController.js";

// const router = express.Router();
// router.post("/issue", auth(["organization"]), issueCredential);
// router.get("/:id", auth(["user","organization"]), getCredentialPdfMeta);

// export default router;
// ```

// ---

// ## 🧪 Sample Handlebars Template (store in DB via `/template` PUT)

// Use these placeholders; they map to `data` constructed in `issueCredential`.

// ```html
// <div style="font-family: Arial, sans-serif; padding: 16px;">
//   <h2 style="text-align:center; margin:0;">{{header.college}}</h2>
//   <p style="text-align:center; margin:4px 0;">{{header.program}}</p>
//   <h3 style="text-align:center; margin:6px 0;">{{header.title}}</h3>

//   <table style="width:100%; border-collapse:collapse; font-size:12px; margin-top:6px;" border="1">
//     <tr>
//       <td style="width:50%"><b>NAME OF THE CANDIDATE</b><br/>{{candidate.name}}</td>
//       <td><b>REGISTER NO.</b><br/>{{candidate.registerNo}}</td>
//     </tr>
//     <tr>
//       <td><b>DEGREE & BRANCH</b><br/>{{candidate.degreeBranch}}</td>
//       <td><b>MONTH & YEAR OF EXAMINATION</b><br/>{{candidate.monthYearOfExam}}</td>
//     </tr>
//     <tr>
//       <td><b>MODE</b><br/>{{candidate.mode}}</td>
//       <td><b>REGULATIONS</b><br/>{{candidate.regulations}}</td>
//     </tr>
//     <tr>
//       <td colspan="2"><b>DATE OF PUBLICATION</b>: {{candidate.dateOfPublication}}</td>
//     </tr>
//   </table>

//   <table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px;" border="1">
//     <thead>
//       <tr>
//         <th>SEM NO.</th><th>SUBJECT CODE</th><th>SUBJECT TITLE</th><th>CREDITS</th><th>GRADE</th><th>RESULT</th>
//       </tr>
//     </thead>
//     <tbody>
//       {{#each table.rows}}
//       <tr>
//         <td>{{semNo}}</td>
//         <td>{{code}}</td>
//         <td>{{title}}</td>
//         <td>{{credits}}</td>
//         <td>{{grade}}</td>
//         <td>{{result}}</td>
//       </tr>
//       {{/each}}
//     </tbody>
//   </table>
// </div>
// ```

// ---

// ## 🔌 `/src/server.js` (mount new routes)

// ```js
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import platformRoutes from "./routes/platformRoutes.js";
// import organizationRoutes from "./routes/organizationRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import templateRoutes from "./routes/templateRoutes.js";
// import semesterRoutes from "./routes/semesterRoutes.js";
// import credentialRoutes from "./routes/credentialRoutes.js";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // EXISTING routes
// app.use("/platform", platformRoutes);
// app.use("/organization", organizationRoutes);
// app.use("/user", userRoutes);

// // NEW routes
// app.use("/auth", authRoutes);
// app.use("/template", templateRoutes);
// app.use("/semester", semesterRoutes);
// app.use("/credential", credentialRoutes);

// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log("MongoDB connected");
//   app.listen(process.env.PORT || 5000, () =>
//     console.log(`Server on ${process.env.PORT || 5000}`)
//   );
// }).catch(console.error);
// ```

// ---

// ## 🧾 `.env` example

// ```
// PORT=5000
// MONGO_URI=mongodb://127.0.0.1:27017/onboarding
// JWT_SECRET=supersecretjwt
// ```

// ---

// ## 🔁 Typical Flow (JWT only)

// 1. **Login**
//    `POST /auth/login { role, email, password }` → `{ token }`

// 2. **User profile**

// * User: `PUT /user/me` (Bearer token of user) → upsert their details
// * Org fills missing: `PUT /user/fill-missing` (org token) `{ userId, patch }`

// 3. **Semester upsert** (org only)
//    `PUT /semester` with:

// ```json
// {
//   "userId":"<userId>",
//   "semesterNumber":5,
//   "monthYearOfExam":"NOV. 2024",
//   "dateOfPublication":"2025-02-25",
//   "subjects":[
//     {"subjectCode":"19CSS51C","subjectTitle":"JAVA PROGRAMMING","credits":4,"grade":"A","result":"PASS"},
//     {"subjectCode":"19CSS52C","subjectTitle":"THEORY OF COMPUTATION","credits":4,"grade":"A","result":"PASS"}
//   ]
// }
// ```

// 4. **Template create/update**
//    `PUT /template` with stored HTML/CSS (Handlebars).

// 5. **Issue credential (PDF)** (org only)
//    `POST /credential/issue` `{ userId, semesterNumber, templateId }` → generates PDF and saves Credential.

// 6. **Fetch credential meta** (user or issuing org)
//    `GET /credential/:id` → `{ pdfPath }` (serve file or stream from your static handler).

// ---

// This is fully MVC, JWT-only, supports **multi-semester**, keeps **dateOfPublication only in Semester**, uses **template collection** for PDFs, and lets the **organization fill missing user details** when the user hasn’t.
