import express from "express";
import {
  getAssessmentBySkill,
  submitAssessment,
} from "../controllers/assessmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:skill", getAssessmentBySkill);
router.post("/submit", protect, submitAssessment);

export default router;
