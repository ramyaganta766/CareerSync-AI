import express from "express";
import { getMyProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/me").get(protect, getMyProfile).put(protect, updateProfile);
router.route("/").post(protect, updateProfile);

export default router;
