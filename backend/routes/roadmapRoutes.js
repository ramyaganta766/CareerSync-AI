import express from "express";
import { getRoadmap, updateRoadmapItem } from "../controllers/roadmapController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getRoadmap);
router.put("/:id", protect, updateRoadmapItem);

export default router;
