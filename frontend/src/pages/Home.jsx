import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  FileText,
  Target,
  Compass,
  Cpu,
  BarChart3,
  Bot,
  Layers,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "radial-gradient(ellipse at top, #eef2ff 0%, #f8fafc 70%)",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 1rem",
              borderRadius: "9999px",
              background: "#e0e7ff",
              color: "#4338ca",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={16} /> Next-Generation MERN Career Platform
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Transform Your Skills into an{" "}
            <span className="gradient-text">Industry-Ready Career</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "var(--text-muted)",
              maxWidth: "750px",
              margin: "0 auto 2.5rem",
            }}
          >
            CareerSync AI parses your resume, benchmarks your proficiency against real-world tech job requirements, identifies skill gaps, and builds an actionable roadmap to get you hired.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link to="/signup" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem", fontSize: "1.05rem" }}>
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/careers" className="btn btn-secondary" style={{ padding: "0.85rem 1.75rem", fontSize: "1.05rem" }}>
              <span>Explore Roles</span>
              <Compass size={18} />
            </Link>
          </div>

          {/* Quick Metrics Banner */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              marginTop: "3.5rem",
              padding: "1.5rem",
              background: "#ffffff",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)" }}>5+ Core Tech Roles</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Data Science, Full Stack, AI/ML</div>
            </div>
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10b981" }}>Weighted Algorithm</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Exact gap analysis & scoring</div>
            </div>
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#06b6d4" }}>PDF Text Parsing</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Multer & NLP skill extraction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="page-container" style={{ padding: "4.5rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "0.75rem" }}>
            Everything You Need for Career Success
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto" }}>
            A unified suite powered by Node.js, Express, MongoDB, and React to accelerate student readiness.
          </p>
        </div>

        <div className="grid-3">
          {/* Feature 1 */}
          <div className="card card-interactive">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#eef2ff",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>AI Resume Analyzer</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Upload your resume PDF. The backend extracts text with pdf-parse and highlights detected technical skills for verification.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card card-interactive">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#ecfdf5",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Skill Gap Detection</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Benchmark your skills against targeted industry job descriptions. Identify high-priority gaps and receive your Career Readiness Score.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card card-interactive">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#fef3c7",
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <BarChart3 size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Analytics Dashboard</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Interactive Recharts visualizations: radar profiles, missing skills bar charts, and readiness score milestones.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="card card-interactive">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#e0f2fe",
                color: "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <Compass size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Personalized Roadmap</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Receive an intelligent timeline with recommended videos, documentation, and hands-on projects to bridge each gap.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="card card-interactive">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#f3e8ff",
                color: "#9333ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Skill Assessments</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Validate claimed skills through backend-evaluated MCQ assessments. Results automatically calibrate your profile mastery level.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="card card-interactive">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#ffe4e6",
                color: "#e11d48",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <Bot size={24} />
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>AI Career Assistant</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5 }}>
              Interactive chatbot ready to generate custom 30-day prep schedules, suggest capstone projects, and answer questions.
            </p>
          </div>
        </div>
      </section>

      {/* MERN Architecture Blueprint Section */}
      <section
        style={{
          background: "#0f172a",
          color: "#ffffff",
          padding: "4rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              style={{
                color: "#38bdf8",
                fontSize: "0.85rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              System Architecture
            </span>
            <h2 style={{ color: "#ffffff", fontSize: "2rem", marginTop: "0.4rem" }}>
              Built with the Modern MERN Stack
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "12px", border: "1px solid #334155" }}>
              <div style={{ color: "#61dafb", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>React.js + Vite</div>
              <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
                Component-driven responsive UI, client-side routing, Recharts dashboards, and Context API authentication.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "12px", border: "1px solid #334155" }}>
              <div style={{ color: "#68a063", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>Node.js & Express.js</div>
              <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
                Modular REST APIs, JWT token authorization, Multer file processing, and skill gap calculation engine.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "12px", border: "1px solid #334155" }}>
              <div style={{ color: "#47a248", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>MongoDB & Mongoose</div>
              <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
                Scalable document storage for users, job benchmarks, parsed resumes, test questions, and customized roadmaps.
              </p>
            </div>
            <div style={{ background: "#1e293b", padding: "1.5rem", borderRadius: "12px", border: "1px solid #334155" }}>
              <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>Bcrypt & JWT</div>
              <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
                High-security password hashing with salt factor 12, signed bearer tokens, and route protection middleware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer
        style={{
          background: "#ffffff",
          borderTop: "1px solid var(--border)",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
          CareerSync AI — The Complete Engineering Career Readiness Platform
        </p>
        <p style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
          Designed with MERN Stack • React 18 • Express • Node.js • MongoDB
        </p>
      </footer>
    </div>
  );
};

export default Home;
