import express from "express";
import cors from "cors";
import "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/admin/test", (req, res) => {
  res.send("Admin route working ✅");
});
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
