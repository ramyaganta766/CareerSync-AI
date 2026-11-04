import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import Resume from "../models/Resume.js";

const KNOWN_SKILLS = [
  "Python", "JavaScript", "TypeScript", "React", "React.js", "Node.js", "Express",
  "MongoDB", "SQL", "MySQL", "PostgreSQL", "Machine Learning", "Deep Learning",
  "TensorFlow", "PyTorch", "NLP", "Data Science", "Statistics", "Power BI",
  "Tableau", "Excel", "DSA", "Java", "C++", "C#", "OOP", "DBMS", "Git",
  "GitHub", "Docker", "Kubernetes", "AWS", "Azure", "HTML", "CSS", "Tailwind CSS",
  "REST APIs", "GraphQL", "Redux", "Next.js", "Linux"
];

export const extractSkillsFromText = (text = "") => {
  const normalized = text.toLowerCase();
  const foundSkills = [];

  KNOWN_SKILLS.forEach((skill) => {
    // Word boundary check or substring match
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(normalized) || normalized.includes(skill.toLowerCase())) {
      if (!foundSkills.includes(skill)) {
        foundSkills.push(skill);
      }
    }
  });

  return foundSkills;
};

// @desc    Upload and parse resume PDF
// @route   POST /api/resume/upload
// @access  Private
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF file" });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);

    // Parse PDF text
    let parsedText = "";
    try {
      const data = await pdfParse(fileBuffer);
      parsedText = data.text || "";
    } catch (parseError) {
      console.warn("PDF parse fallback:", parseError.message);
      parsedText = req.file.originalname;
    }

    const extractedSkills = extractSkillsFromText(parsedText);

    // Save resume record
    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      extractedText: parsedText.slice(0, 5000), // First 5000 chars
      extractedSkills,
      targetRole: req.body.targetRole || "Full Stack Developer",
    });

    res.status(201).json({
      message: "Resume parsed successfully",
      resumeId: resume._id,
      fileName: resume.fileName,
      extractedSkills,
      totalSkillsFound: extractedSkills.length,
      sampleText: parsedText.slice(0, 300),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's latest resume analysis
// @route   GET /api/resume/me
// @access  Private
export const getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (!resume) {
      return res.status(404).json({ message: "No resume uploaded yet" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
