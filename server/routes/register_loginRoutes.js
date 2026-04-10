import express from "express";
import { sendOTP, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/register", register);

export default router;
