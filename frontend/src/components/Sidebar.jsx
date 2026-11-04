import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  GitCompare,
  Milestone,
  CheckSquare,
  Bot,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/profile", label: "My Profile", icon: User },
  { path: "/resume-analyzer", label: "Resume Analyzer", icon: FileText },
  { path: "/careers", label: "Explore Careers", icon: Briefcase },
  { path: "/skill-gap", label: "Skill Gap Analysis", icon: GitCompare },
  { path: "/roadmap", label: "Learning Roadmap", icon: Milestone },
  { path: "/assessment", label: "Skill Assessment", icon: CheckSquare },
  { path: "/chatbot", label: "AI Career Assistant", icon: Bot },
];

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#ffffff",
        borderRight: "1px solid var(--border)",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      }}
    >
      <div
        style={{
          padding: "0 0.75rem 1rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-muted)",
        }}
      >
        Student Portal
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.65rem 0.85rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.9rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "var(--primary)" : "var(--text-dark)",
              backgroundColor: isActive ? "var(--primary-light)" : "transparent",
              transition: "all 0.15s ease",
              textDecoration: "none",
            })}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Sidebar;
