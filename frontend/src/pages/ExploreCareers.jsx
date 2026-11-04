import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api.js";
import { Briefcase, DollarSign, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ExploreCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await API.get("/careers");
        setCareers(res.data);
      } catch (err) {
        console.warn("Using fallback career roles:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "2rem 2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.9rem", marginBottom: "0.25rem" }}>Explore Career Benchmarks</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Review market requirements and target competencies for the top technology specializations.
          </p>
        </div>

        <div className="grid-2">
          {careers.map((career, index) => (
            <div key={index} className="card card-interactive" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: "0.5rem" }}>
                    {career.category || "Engineering"}
                  </span>
                  <h3 style={{ fontSize: "1.3rem" }}>{career.title}</h3>
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#059669" }}>
                  {career.averageSalary}
                </div>
              </div>

              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", flex: 1 }}>
                {career.description}
              </p>

              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#64748b", marginBottom: "0.5rem" }}>
                  REQUIRED CORE SKILLS:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {career.skills?.map((s, sIdx) => (
                    <span key={sIdx} className="badge badge-primary" style={{ fontSize: "0.8rem" }}>
                      {s.name} (Lvl {s.requiredLevel})
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/skill-gap?role=${encodeURIComponent(career.title)}`}
                className="btn btn-secondary btn-sm"
                style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
              >
                <span>Run Gap Analysis for this Role</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExploreCareers;
