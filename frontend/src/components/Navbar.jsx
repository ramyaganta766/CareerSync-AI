import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Sparkles, Compass, LogIn, UserPlus, LogOut, LayoutDashboard, User } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
              borderRadius: "10px",
              padding: "0.45rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <Sparkles size={22} />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: "#0f172a",
              }}
            >
              CareerSync<span style={{ color: "#4f46e5" }}>.AI</span>
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.8rem",
          }}
        >
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: "0.92rem",
              color: isActive("/") ? "var(--primary)" : "var(--text-muted)",
              transition: "color 0.2s ease",
            }}
          >
            Home
          </Link>
          <Link
            to="/careers"
            style={{
              fontWeight: 600,
              fontSize: "0.92rem",
              color: isActive("/careers") ? "var(--primary)" : "var(--text-muted)",
              transition: "color 0.2s ease",
            }}
          >
            Explore Careers
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              style={{
                fontWeight: 600,
                fontSize: "0.92rem",
                color: isActive("/dashboard") ? "var(--primary)" : "var(--text-muted)",
                transition: "color 0.2s ease",
              }}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth CTA Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "9999px",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                }}
              >
                <User size={16} />
                <span>{user?.name || "Student"}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                title="Logout"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={16} />
                <span>Log In</span>
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                <span>Get Started</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
