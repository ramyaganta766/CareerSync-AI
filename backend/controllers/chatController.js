import Profile from "../models/Profile.js";
import SkillGap from "../models/SkillGap.js";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Fetch student context if authenticated
    let userProfile = null;
    let skillReport = null;
    if (req.user) {
      userProfile = await Profile.findOne({ user: req.user._id });
      skillReport = await SkillGap.findOne({ user: req.user._id }).sort({ updatedAt: -1 });
    }

    const text = message.toLowerCase();
    let reply = "";

    const targetRole = userProfile?.targetRole || "Full Stack Developer";
    const readiness = skillReport ? `${skillReport.readinessScore}%` : "Not assessed yet";

    if (text.includes("data scientist") || text.includes("data science")) {
      reply = `To become a **Data Scientist**, focus on this high-impact roadmap:
1. **Mathematics & Stats**: Probability distributions, hypothesis testing, linear algebra.
2. **Programming & Querying**: Python (Pandas, NumPy) and Advanced SQL.
3. **Machine Learning**: Scikit-Learn for regression, classification, clustering, and cross-validation.
4. **Data Visualization**: Matplotlib, Seaborn, and Power BI/Tableau storytelling.
5. **Portfolio Projects**: Build predictive models on real-world datasets with clear ROI metrics.`;
    } else if (text.includes("ai/ml") || text.includes("machine learning") || text.includes("deep learning")) {
      reply = `For an **AI/ML Engineer** career path:
- Master **PyTorch** or **TensorFlow** for building neural networks.
- Dive into **Transformer models** and modern NLP / Computer Vision pipelines.
- Practice model optimization: quantization, pruning, and ONNX runtime.
- Deploy models as REST APIs using **FastAPI** or **Docker**.`;
    } else if (text.includes("full stack") || text.includes("web developer") || text.includes("mern")) {
      reply = `For **Full Stack Development (MERN)**:
- Master modern **React.js** (Hooks, State Management, Vite, Tailwind CSS).
- Build robust **Node.js & Express.js** microservices with JWT authentication & security best practices.
- Master **MongoDB & Mongoose** schema indexing, aggregations, and data validation.
- Focus on clean code, REST APIs, Git version control, and CI/CD deployment on Vercel/Render.`;
    } else if (text.includes("project") || text.includes("projects")) {
      reply = `Here are standout project ideas for your **${targetRole}** journey:
1. **AI Resume & Portfolio Analyzer**: Build a full-stack tool that parses documents, scores keyword match, and provides advice.
2. **Real-time Analytics Dashboard**: Aggregate live metrics using WebSocket/Polling, MongoDB aggregations, and interactive charts.
3. **Automated Workflow Engine**: A SaaS dashboard with role-based auth, stripe/mock billing, and background queues.`;
    } else if (text.includes("30-day") || text.includes("plan") || text.includes("schedule")) {
      reply = `Here is your customized **30-Day Preparation Plan** for ${targetRole}:
- **Days 1-7**: Foundation refresh & Core language fundamentals (Python/JS/DSA).
- **Days 8-15**: Deep dive into primary framework & database schemas.
- **Days 16-23**: Build an end-to-end full-stack capstone project.
- **Days 24-28**: Comprehensive mock assessments, resume polish, and portfolio deployment.
- **Days 29-30**: Behavioral interview prep and targeted job applications.`;
    } else if (text.includes("readiness") || text.includes("score") || text.includes("status")) {
      reply = `Your current target role is **${targetRole}**. Your computed Career Readiness Score is **${readiness}**. You can boost your score by taking our skill assessments and completing your roadmap milestones!`;
    } else {
      reply = `Hello! I am your **CareerSync AI Assistant**. I can help you with:
- Career roadmaps (e.g., Data Scientist, AI/ML Engineer, Full Stack)
- Customized 30-day study schedules
- Resume & project recommendations
- Bridging skill gaps for your target role: **${targetRole}**

What would you like to explore today?`;
    }

    res.json({ reply, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
