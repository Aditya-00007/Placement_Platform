import express from "express";
import { userAuth, isCandidate } from "../middleware/userMiddleware.js";

const router = express.Router();

router.get("/dashboard", userAuth, isCandidate, (req, res) => {
  res.json({ msg: "Welcome Candidate" });
});

export default router;
