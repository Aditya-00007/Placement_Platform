import express from "express";
import { userAuth, isEmployer } from "../middleware/userMiddleware.js";

const router = express.Router();

router.get("/dashboard", userAuth, isEmployer, (req, res) => {
  res.json({ msg: "Welcome Employee" });
});

export default router;
