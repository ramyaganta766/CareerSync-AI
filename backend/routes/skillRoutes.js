import express from "express";
import { runSkillAnalysis, getLatestReport } from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/analyze", protect, runSkillAnalysis);
router.get("/report", protect, getLatestReport);

export default router;
