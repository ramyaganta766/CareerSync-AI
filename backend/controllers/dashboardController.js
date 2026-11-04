import Profile from "../models/Profile.js";
import SkillGap from "../models/SkillGap.js";
import Roadmap from "../models/Roadmap.js";
import Resume from "../models/Resume.js";

// @desc    Get consolidated career readiness dashboard metrics
// @route   GET /api/dashboard
// @access  Private
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch Profile
    let profile = await Profile.findOne({ user: userId });
    const targetRole = profile?.targetRole || "Full Stack Developer";
    const userSkills = profile?.skills || [];

    // Fetch latest Skill Gap report
    const skillReport = await SkillGap.findOne({ user: userId }).sort({ updatedAt: -1 });

    // Fetch roadmap stats
    const roadmapItems = await Roadmap.find({ user: userId });
    const completedTasks = roadmapItems.filter((item) => item.completed).length;
    const totalTasks = roadmapItems.length;

    // Fetch latest resume
    const latestResume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });

    // Readiness score calculation fallback
    const readinessScore = skillReport?.readinessScore ?? 68;

    // Chart data for Radar & Bar comparison
    const chartData = skillReport?.skills?.map((s) => ({
      skill: s.name,
      current: s.current,
      required: s.required,
      gap: s.gap,
      status: s.status,
    })) || [
      { skill: "JavaScript", current: 4, required: 5, gap: 1, status: "Needs Improvement" },
      { skill: "React", current: 3, required: 4, gap: 1, status: "Needs Improvement" },
      { skill: "Node.js", current: 3, required: 4, gap: 1, status: "Needs Improvement" },
      { skill: "MongoDB", current: 3, required: 4, gap: 1, status: "Needs Improvement" },
      { skill: "REST APIs", current: 4, required: 4, gap: 0, status: "Completed" },
    ];

    const missingSkillsCount = chartData.filter((s) => s.gap > 0).length;

    res.json({
      readinessScore,
      targetRole,
      totalSkills: userSkills.length,
      missingSkillsCount,
      completedTasks,
      totalTasks,
      roadmapProgress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      chartData,
      resumeUploaded: !!latestResume,
      latestResumeName: latestResume?.fileName || null,
      recommendations: [
        "Take the JavaScript Skill Assessment to validate your proficiency.",
        `Focus on bridging gaps in ${chartData.find((s) => s.gap > 0)?.skill || "System Design"} to boost your score.`,
        "Upload your updated resume PDF to re-scan for verified skill keywords.",
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
