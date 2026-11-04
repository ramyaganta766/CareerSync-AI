import Roadmap from "../models/Roadmap.js";
import Profile from "../models/Profile.js";
import JobRole from "../models/JobRole.js";

const CURATED_RESOURCES = {
  "deep learning": {
    title: "Deep Learning Specialization & CNN Architectures",
    type: "Course",
    url: "https://www.deeplearning.ai/",
    duration: "3 weeks",
  },
  tensorflow: {
    title: "Official TensorFlow 2.x Deep Dive & Tutorials",
    type: "Documentation",
    url: "https://www.tensorflow.org/tutorials",
    duration: "2 weeks",
  },
  nlp: {
    title: "Natural Language Processing with Transformers",
    type: "Course",
    url: "https://huggingface.co/learn/nlp-course",
    duration: "2 weeks",
  },
  react: {
    title: "Full Modern React & Hooks Deep Dive",
    type: "Video",
    url: "https://react.dev/learn",
    duration: "2 weeks",
  },
  "node.js": {
    title: "Node.js & Express RESTful API Mastery",
    type: "Documentation",
    url: "https://nodejs.org/en/docs",
    duration: "2 weeks",
  },
  mongodb: {
    title: "MongoDB University - Aggregation & Schema Design",
    type: "Course",
    url: "https://learn.mongodb.com/",
    duration: "1 week",
  },
  dsa: {
    title: "Data Structures & Algorithms in Java/Python",
    type: "Practice",
    url: "https://leetcode.com/explore/",
    duration: "4 weeks",
  },
  sql: {
    title: "Advanced SQL for Data Analysts & Engineers",
    type: "Interactive",
    url: "https://mode.com/sql-tutorial/",
    duration: "1 week",
  },
  python: {
    title: "Python 3 Standard Library & Clean Code",
    type: "Documentation",
    url: "https://docs.python.org/3/tutorial/",
    duration: "1 week",
  },
};

// @desc    Get or generate user learning roadmap
// @route   GET /api/roadmap
// @access  Private
export const getRoadmap = async (req, res) => {
  try {
    let items = await Roadmap.find({ user: req.user._id }).sort({ priority: 1 });

    if (!items || items.length === 0) {
      // Auto-generate based on missing skills for the profile's target role
      const profile = await Profile.findOne({ user: req.user._id });
      const targetRoleTitle = profile?.targetRole || "Full Stack Developer";
      const userSkills = profile?.skills || [];

      const jobRole = await JobRole.findOne({
        title: { $regex: new RegExp(`^${targetRoleTitle}$`, "i") },
      });

      const requiredSkills = jobRole?.skills || [
        { name: "React", requiredLevel: 4 },
        { name: "Node.js", requiredLevel: 4 },
        { name: "MongoDB", requiredLevel: 4 },
      ];

      const initialRoadmap = [];

      requiredSkills.forEach((reqSkill) => {
        const studentSkill = userSkills.find(
          (s) => s.name.toLowerCase() === reqSkill.name.toLowerCase()
        );
        const currentLevel = studentSkill?.level || 0;
        if (currentLevel < reqSkill.requiredLevel) {
          const lowerName = reqSkill.name.toLowerCase();
          const resource = CURATED_RESOURCES[lowerName] || {
            title: `Mastering ${reqSkill.name} for Production`,
            type: "Documentation",
            url: `https://www.google.com/search?q=${encodeURIComponent(reqSkill.name + " tutorial")}`,
            duration: "2 weeks",
          };

          const gap = reqSkill.requiredLevel - currentLevel;
          initialRoadmap.push({
            user: req.user._id,
            targetRole: targetRoleTitle,
            skillName: reqSkill.name,
            priority: gap > 2 ? "High" : gap === 2 ? "Medium" : "Low",
            recommendedResource: resource,
            startDate: new Date(),
            targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            completed: false,
          });
        }
      });

      if (initialRoadmap.length > 0) {
        items = await Roadmap.insertMany(initialRoadmap);
      }
    }

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update roadmap item completion status
// @route   PUT /api/roadmap/:id
// @access  Private
export const updateRoadmapItem = async (req, res) => {
  try {
    const item = await Roadmap.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ message: "Roadmap item not found" });
    }

    item.completed = req.body.completed !== undefined ? req.body.completed : !item.completed;
    item.completedAt = item.completed ? new Date() : null;
    await item.save();

    res.json({ message: "Roadmap item updated", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
