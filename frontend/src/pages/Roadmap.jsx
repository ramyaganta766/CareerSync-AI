import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api.js";
import { CheckCircle, Circle, ExternalLink, Calendar, Milestone } from "lucide-react";

const Roadmap = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoadmap = async () => {
    try {
      const res = await API.get("/roadmap");
      setItems(res.data);
    } catch (err) {
      console.warn("Roadmap fallback:", err.message);
      setItems([
        {
          _id: "1",
          skillName: "Node.js & Express RESTful APIs",
          priority: "High",
          recommendedResource: {
            title: "RESTful Web API Design & Security Patterns",
            type: "Documentation",
            url: "https://nodejs.org/en/docs",
            duration: "2 weeks",
          },
          completed: false,
        },
        {
          _id: "2",
          skillName: "MongoDB Aggregations",
          priority: "High",
          recommendedResource: {
            title: "MongoDB University - Aggregation Framework",
            type: "Course",
            url: "https://learn.mongodb.com/",
            duration: "1 week",
          },
          completed: false,
        },
        {
          _id: "3",
          skillName: "Modern React & Custom Hooks",
          priority: "Medium",
          recommendedResource: {
            title: "Official React 18+ Documentation & Tutorials",
            type: "Video",
            url: "https://react.dev/learn",
            duration: "2 weeks",
          },
          completed: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const toggleComplete = async (id, currentStatus) => {
    try {
      await API.put(`/roadmap/${id}`, { completed: !currentStatus });
      setItems(
        items.map((item) =>
          item._id === id ? { ...item, completed: !currentStatus } : item
        )
      );
    } catch (err) {
      console.error("Failed to update milestone:", err.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "2rem 2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.9rem", marginBottom: "0.25rem" }}>Personalized Learning Roadmap</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Step-by-step verified curriculum recommended to bridge identified skill gaps.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "850px" }}>
          {items.map((item, index) => (
            <div
              key={item._id || index}
              className="card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem",
                opacity: item.completed ? 0.75 : 1,
                borderLeft: item.priority === "High" ? "4px solid #ef4444" : "4px solid #4f46e5",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  onClick={() => toggleComplete(item._id, item.completed)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: item.completed ? "#10b981" : "#94a3b8",
                  }}
                  title={item.completed ? "Mark incomplete" : "Mark as completed"}
                >
                  {item.completed ? <CheckCircle size={28} /> : <Circle size={28} />}
                </button>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        textDecoration: item.completed ? "line-through" : "none",
                      }}
                    >
                      {item.skillName}
                    </h3>
                    <span
                      className={`badge ${
                        item.priority === "High" ? "badge-danger" : "badge-primary"
                      }`}
                    >
                      {item.priority} Priority
                    </span>
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: "0.25rem" }}>
                    {item.recommendedResource?.title} •{" "}
                    <strong>{item.recommendedResource?.duration || "1-2 weeks"}</strong>
                  </p>
                </div>
              </div>

              {item.recommendedResource?.url && (
                <a
                  href={item.recommendedResource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <span>Open Resource</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
