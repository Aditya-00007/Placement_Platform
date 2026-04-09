import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ msg: "Welcome Admin " });
});

export default router;
