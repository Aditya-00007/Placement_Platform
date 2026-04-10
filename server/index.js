import express from "express";
import cors from "cors";
import "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import register_loginRoutes from "./routes/register_loginRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", register_loginRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/employer", employerRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
