import express from "express";
import { sendOTP, register } from "../controllers/authController";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", register);

export default router;
