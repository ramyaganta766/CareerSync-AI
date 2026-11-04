import JobRole from "../models/JobRole.js";

const DEFAULT_ROLES = [
  {
    title: "Full Stack Developer",
    description: "Build scalable web applications across the frontend (React, modern CSS) and backend (Node, Express, MongoDB, APIs).",
    category: "Software Development",
    averageSalary: "$95,000 - $140,000",
    skills: [
      { name: "JavaScript", requiredLevel: 5, weight: 2 },
      { name: "React", requiredLevel: 4, weight: 2 },
      { name: "Node.js", requiredLevel: 4, weight: 2 },
      { name: "MongoDB", requiredLevel: 4, weight: 1.5 },
      { name: "HTML & CSS", requiredLevel: 4, weight: 1 },
      { name: "REST APIs", requiredLevel: 4, weight: 1.5 },
      { name: "Git", requiredLevel: 3, weight: 1 },
    ],
  },
  {
    title: "AI/ML Engineer",
    description: "Design and train deep learning models, deploy neural architectures, and integrate production AI solutions.",
    category: "Artificial Intelligence",
    averageSalary: "$115,000 - $165,000",
    skills: [
      { name: "Python", requiredLevel: 5, weight: 2 },
      { name: "Machine Learning", requiredLevel: 5, weight: 2 },
      { name: "Deep Learning", requiredLevel: 4, weight: 2 },
      { name: "TensorFlow", requiredLevel: 4, weight: 1.5 },
      { name: "NLP", requiredLevel: 3, weight: 1.5 },
      { name: "SQL", requiredLevel: 3, weight: 1 },
    ],
  },
  {
    title: "Data Scientist",
    description: "Extract actionable insights, run statistical modeling, and apply machine learning algorithms to complex datasets.",
    category: "Data Science",
    averageSalary: "$105,000 - $155,000",
    skills: [
      { name: "Python", requiredLevel: 5, weight: 2 },
      { name: "SQL", requiredLevel: 4, weight: 2 },
      { name: "Statistics", requiredLevel: 4, weight: 1.5 },
      { name: "Machine Learning", requiredLevel: 4, weight: 2 },
      { name: "Data Visualization", requiredLevel: 4, weight: 1 },
      { name: "Deep Learning", requiredLevel: 3, weight: 1 },
    ],
  },
  {
    title: "Data Analyst",
    description: "Transform business numbers into interactive BI dashboards, perform statistical queries, and drive strategy.",
    category: "Data Analytics",
    averageSalary: "$70,000 - $105,000",
    skills: [
      { name: "Excel", requiredLevel: 5, weight: 2 },
      { name: "SQL", requiredLevel: 4, weight: 2 },
      { name: "Power BI", requiredLevel: 4, weight: 1.5 },
      { name: "Python", requiredLevel: 3, weight: 1 },
      { name: "Statistics", requiredLevel: 3, weight: 1 },
    ],
  },
  {
    title: "Software Engineer",
    description: "Write high-performance backend systems, object-oriented solutions, algorithms, and core architectures.",
    category: "Core Engineering",
    averageSalary: "$100,000 - $150,000",
    skills: [
      { name: "DSA", requiredLevel: 5, weight: 2 },
      { name: "Java", requiredLevel: 4, weight: 2 },
      { name: "OOP", requiredLevel: 4, weight: 1.5 },
      { name: "DBMS", requiredLevel: 4, weight: 1.5 },
      { name: "Git", requiredLevel: 4, weight: 1 },
    ],
  },
];

// @desc    Get all available career roles (auto-seeds defaults if empty)
// @route   GET /api/careers
// @access  Public
export const getCareers = async (req, res) => {
  try {
    let roles = await JobRole.find();
    if (!roles || roles.length === 0) {
      await JobRole.insertMany(DEFAULT_ROLES);
      roles = await JobRole.find();
    }
    res.json(roles);
  } catch (error) {
    // If database connection is not ready, return defaults directly
    res.json(DEFAULT_ROLES);
  }
};

// @desc    Get single career role by ID or title
// @route   GET /api/careers/:id
// @access  Public
export const getCareerById = async (req, res) => {
  try {
    let role;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      role = await JobRole.findById(req.params.id);
    }
    if (!role) {
      role = DEFAULT_ROLES.find(
        (r) =>
          r.title.toLowerCase() ===
          decodeURIComponent(req.params.id).toLowerCase()
      );
    }
    if (!role) {
      return res.status(404).json({ message: "Career role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
