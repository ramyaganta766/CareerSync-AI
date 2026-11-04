import express from "express";
import { getCareers, getCareerById } from "../controllers/careerController.js";

const router = express.Router();

router.get("/", getCareers);
router.get("/:id", getCareerById);

export default router;
