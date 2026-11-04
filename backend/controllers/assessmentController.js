import Assessment from "../models/Assessment.js";
import Profile from "../models/Profile.js";

const DEFAULT_ASSESSMENTS = {
  python: {
    skill: "Python",
    description: "Evaluate your core Python data structures, OOP concepts, and syntax.",
    durationMinutes: 10,
    questions: [
      {
        question: "Which of the following data structures is immutable in Python?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        correctAnswer: 2,
        explanation: "Tuples cannot be modified after creation in Python.",
      },
      {
        question: "What is the output of bool([]) in Python?",
        options: ["True", "False", "None", "Error"],
        correctAnswer: 1,
        explanation: "Empty sequences and collections evaluate to False in Python truth testing.",
      },
      {
        question: "Which keyword is used to create a generator function in Python?",
        options: ["return", "generate", "yield", "async"],
        correctAnswer: 2,
        explanation: "The 'yield' keyword pauses execution and yields a value to the caller.",
      },
      {
        question: "What is the time complexity of looking up a key in a Python dictionary on average?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
        correctAnswer: 2,
        explanation: "Python dictionaries are implemented using hash tables, offering O(1) average lookup.",
      },
    ],
  },
  javascript: {
    skill: "JavaScript",
    description: "Test your JavaScript ES6+, asynchronous programming, and DOM knowledge.",
    durationMinutes: 10,
    questions: [
      {
        question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2,
        explanation: "const creates a block-scoped immutable binding.",
      },
      {
        question: "What does 'typeof NaN' evaluate to in JavaScript?",
        options: ["'undefined'", "'nan'", "'number'", "'object'"],
        correctAnswer: 2,
        explanation: "NaN is technically a numeric data type representing Not-a-Number.",
      },
      {
        question: "Which method is used to combine array elements into a single accumulator value?",
        options: ["map()", "filter()", "reduce()", "forEach()"],
        correctAnswer: 2,
        explanation: "Array.prototype.reduce executes a reducer function on each element.",
      },
    ],
  },
};

// @desc    Get assessment questions for a skill (without leaking correct answers)
// @route   GET /api/assessments/:skill
// @access  Public
export const getAssessmentBySkill = async (req, res) => {
  try {
    const skillParam = req.params.skill.toLowerCase();
    const assessment = DEFAULT_ASSESSMENTS[skillParam] || {
      skill: req.params.skill,
      description: `Skill assessment test for ${req.params.skill}`,
      durationMinutes: 10,
      questions: [
        {
          question: `What is the primary role of ${req.params.skill} in modern software development?`,
          options: [
            "Data storage & normalization",
            "Performance optimization & modular execution",
            "Hardware microcode compilation",
            "Network packet sniffing",
          ],
          correctAnswer: 1,
          explanation: "Modular execution and performance optimization.",
        },
      ],
    };

    // Strip out correctAnswer from questions sent to frontend to prevent cheating!
    const sanitizedQuestions = assessment.questions.map((q, idx) => ({
      id: idx,
      question: q.question,
      options: q.options,
    }));

    res.json({
      skill: assessment.skill,
      description: assessment.description,
      durationMinutes: assessment.durationMinutes,
      questions: sanitizedQuestions,
      totalQuestions: sanitizedQuestions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit answers and calculate skill score
// @route   POST /api/assessments/submit
// @access  Private
export const submitAssessment = async (req, res) => {
  try {
    const { skill, answers } = req.body; // answers is an object or array: { 0: 2, 1: 1, ... }
    const skillParam = (skill || "python").toLowerCase();
    const sourceAssessment = DEFAULT_ASSESSMENTS[skillParam];

    const questions = sourceAssessment?.questions || [];
    let correctCount = 0;

    questions.forEach((q, idx) => {
      if (answers && Number(answers[idx]) === q.correctAnswer) {
        correctCount++;
      }
    });

    const total = questions.length || 1;
    const percentage = Math.round((correctCount / total) * 100);

    let suggestedLevel = 1; // 1 to 5
    let masteryLabel = "Beginner";

    if (percentage >= 80) {
      suggestedLevel = 5;
      masteryLabel = "Strong Mastery";
    } else if (percentage >= 60) {
      suggestedLevel = 4;
      masteryLabel = "Advanced";
    } else if (percentage >= 40) {
      suggestedLevel = 3;
      masteryLabel = "Intermediate";
    } else if (percentage >= 20) {
      suggestedLevel = 2;
      masteryLabel = "Basic";
    }

    // Auto-update student profile skill level if requested
    if (req.user) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        const existingSkill = profile.skills.find(
          (s) => s.name.toLowerCase() === skillParam
        );
        if (existingSkill) {
          existingSkill.level = Math.max(existingSkill.level, suggestedLevel);
        } else {
          profile.skills.push({ name: skill, level: suggestedLevel });
        }
        await profile.save();
      }
    }

    res.json({
      skill,
      score: percentage,
      correctCount,
      totalQuestions: total,
      suggestedLevel,
      masteryLabel,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
