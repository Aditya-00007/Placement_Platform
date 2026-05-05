import express from "express";
import {
  sendOTP,
  register,
  login,
  sendForgotOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password/send-otp", sendForgotOTP);
router.post("/forgot-password/reset", resetPassword);

export default router;
