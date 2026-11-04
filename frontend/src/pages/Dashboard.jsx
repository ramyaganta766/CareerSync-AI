import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../services/api.js";
import Sidebar from "../components/Sidebar.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Award,
  Target,
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.warn("Using default dashboard data:", err.message);
        setData({
          readinessScore: 65,
          targetRole: "Full Stack Developer",
          totalSkills: 5,
          missingSkillsCount: 3,
          completedTasks: 2,
          totalTasks: 5,
          roadmapProgress: 40,
          chartData: [
            { skill: "JavaScript", current: 4, required: 5, gap: 1 },
            { skill: "React", current: 3, required: 4, gap: 1 },
            { skill: "Node.js", current: 2, required: 4, gap: 2 },
            { skill: "MongoDB", current: 2, required: 4, gap: 2 },
            { skill: "REST APIs", current: 3, required: 4, gap: 1 },
          ],
          recommendations: [
            "Complete the Node.js REST API assessment to validate your backend skills.",
            "Review your high-priority gap in MongoDB schema design.",
            "Upload your latest PDF resume to verify your credentials.",
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content" style={{ padding: "2.5rem" }}>
          <p style={{ color: "var(--text-muted)" }}>Loading career intelligence metrics...</p>
        </main>
      </div>
    );
  }

  const scoreColor =
    data.readinessScore >= 75
      ? "#10b981"
      : data.readinessScore >= 50
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "2rem 2.5rem" }}>
        {/* Welcome Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.9rem", marginBottom: "0.25rem" }}>
            Welcome back, {user?.name || "Student"}! 👋
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Here is your live career readiness diagnostic for{" "}
            <span style={{ fontWeight: 700, color: "var(--primary)" }}>
              {data.targetRole}
            </span>
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          {/* Readiness Score */}
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "var(--primary-light)",
                color: scoreColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.35rem",
              }}
            >
              {data.readinessScore}%
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                READINESS SCORE
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {data.readinessScore >= 75 ? "Market Ready" : "Building Skills"}
              </div>
            </div>
          </div>

          {/* Target Role */}
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#ecfdf5",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Target size={26} />
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                TARGET CAREER
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                {data.targetRole}
              </div>
            </div>
          </div>

          {/* Missing Skills */}
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#fef3c7",
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={26} />
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                SKILL GAPS
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {data.missingSkillsCount} Skills to Bridge
              </div>
            </div>
          </div>

          {/* Roadmap Progress */}
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "#e0f2fe",
                color: "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={26} />
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
                ROADMAP PROGRESS
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {data.completedTasks}/{data.totalTasks} Milestones ({data.roadmapProgress}%)
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid-2" style={{ marginBottom: "2rem" }}>
          {/* Bar Chart: Current vs Required */}
          <div className="card">
            <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem" }}>
              Skill Benchmark (Current vs Required Level)
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <XAxis dataKey="skill" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tickCount={6} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Your Level" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="required" name="Job Benchmark" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="card">
            <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem" }}>
              Proficiency Radar Map
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis domain={[0, 5]} />
                  <Radar name="Current Proficiency" dataKey="current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                  <Radar name="Role Benchmark" dataKey="required" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.15rem" }}>Recommended Next Actions</h3>
            <Link to="/roadmap" className="btn btn-secondary btn-sm">
              <span>View Full Roadmap</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {data.recommendations?.map((rec, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  background: "var(--bg-main)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.92rem",
                }}
              >
                <CheckCircle size={18} color="#10b981" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
