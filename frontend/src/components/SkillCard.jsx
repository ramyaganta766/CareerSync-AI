import React from "react";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const SkillCard = ({ name, current = 0, required = 3, gap = 0, status = "Needs Improvement" }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case "Completed":
        return {
          bg: "#ecfdf5",
          text: "#059669",
          icon: <CheckCircle2 size={14} />,
        };
      case "High Priority":
        return {
          bg: "#fef2f2",
          text: "#dc2626",
          icon: <AlertCircle size={14} />,
        };
      default:
        return {
          bg: "#fef3c7",
          text: "#d97706",
          icon: <Clock size={14} />,
        };
    }
  };

  const badge = getBadgeStyle();

  return (
    <div
      className="card"
      style={{
        padding: "1.1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>{name}</h4>
        <span
          className="badge"
          style={{
            backgroundColor: badge.bg,
            color: badge.text,
          }}
        >
          {badge.icon}
          {status}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <span>Student Level: <strong>{current}/5</strong></span>
        <span>Required Level: <strong>{required}/5</strong></span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "8px",
          backgroundColor: "#e2e8f0",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.round((current / required) * 100))}%`,
            height: "100%",
            backgroundColor: status === "Completed" ? "#10b981" : status === "High Priority" ? "#ef4444" : "#f59e0b",
            borderRadius: "9999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {gap > 0 && (
        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
          Target gap: <span style={{ fontWeight: 600, color: badge.text }}>+{gap} level(s) needed</span>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
