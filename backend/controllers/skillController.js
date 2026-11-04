import Profile from "../models/Profile.js";
import JobRole from "../models/JobRole.js";
import SkillGap from "../models/SkillGap.js";
import { analyzeSkills } from "../utils/skillAnalyzer.js";

// @desc    Perform skill gap analysis
// @route   POST /api/skills/analyze
// @access  Private
export const runSkillAnalysis = async (req, res) => {
  try {
    const { targetRoleTitle, studentSkills } = req.body;

    // Fetch user profile
    const profile = await Profile.findOne({ user: req.user._id });
    const targetRoleName = targetRoleTitle || profile?.targetRole || "Full Stack Developer";

    // Fetch benchmark job role
    let jobRole = await JobRole.findOne({
      title: { $regex: new RegExp(`^${targetRoleName}$`, "i") },
    });

    if (!jobRole) {
      // Fallback default skills if role not explicitly in DB
      jobRole = {
        title: targetRoleName,
        skills: [
          { name: "Core Skills", requiredLevel: 4, weight: 2 },
          { name: "System Design", requiredLevel: 3, weight: 1.5 },
          { name: "Problem Solving", requiredLevel: 4, weight: 2 },
        ],
      };
    }

    const currentSkills = studentSkills || profile?.skills || [];
    const analysisResult = analyzeSkills(currentSkills, jobRole.skills);

    // Save report in SkillGap collection
    const report = await SkillGap.findOneAndUpdate(
      { user: req.user._id, targetRole: targetRoleName },
      {
        user: req.user._id,
        targetRole: targetRoleName,
        readinessScore: analysisResult.readinessScore,
        skills: analysisResult.skills,
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      targetRole: targetRoleName,
      readinessScore: analysisResult.readinessScore,
      skills: analysisResult.skills,
      reportId: report._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get latest skill gap report
// @route   GET /api/skills/report
// @access  Private
export const getLatestReport = async (req, res) => {
  try {
    const report = await SkillGap.findOne({ user: req.user._id }).sort({ updatedAt: -1 });
    if (!report) {
      return res.status(404).json({ message: "No skill analysis report found yet" });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
