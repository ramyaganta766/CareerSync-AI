import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api.js";
import { User, Save, Plus, Trash2, CheckCircle2 } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    college: "",
    degree: "",
    branch: "",
    graduationYear: 2026,
    targetRole: "Full Stack Developer",
    skills: [],
  });
  const [newSkill, setNewSkill] = useState({ name: "", level: 3 });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me");
        if (res.data) {
          setProfile({
            college: res.data.college || "",
            degree: res.data.degree || "",
            branch: res.data.branch || "",
            graduationYear: res.data.graduationYear || 2026,
            targetRole: res.data.targetRole || "Full Stack Developer",
            skills: res.data.skills || [],
          });
        }
      } catch (err) {
        console.warn("Profile fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, { name: newSkill.name.trim(), level: Number(newSkill.level) }],
    });
    setNewSkill({ name: "", level: 3 });
  };

  const handleRemoveSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setStatus("Saving...");
      await API.put("/profile/me", profile);
      setStatus("Profile saved successfully!");
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      setStatus("Error saving profile: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "2rem 2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.9rem", marginBottom: "0.25rem" }}>My Student Profile</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Keep your academic background and technical skills updated for accurate AI gap analysis.
          </p>
        </div>

        {status && (
          <div className="alert alert-success">
            <CheckCircle2 size={18} />
            <span>{status}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="card" style={{ maxWidth: "800px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem" }}>Academic Information</h3>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">College / University</label>
              <input
                type="text"
                className="form-control"
                value={profile.college}
                onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                placeholder="e.g. National Institute of Technology"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-control"
                value={profile.degree}
                onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                placeholder="e.g. B.Tech / B.E."
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Branch / Major</label>
              <input
                type="text"
                className="form-control"
                value={profile.branch}
                onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                placeholder="e.g. Computer Science & AI"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <input
                type="number"
                className="form-control"
                value={profile.graduationYear}
                onChange={(e) => setProfile({ ...profile, graduationYear: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Target Career Role</label>
            <select
              className="form-control"
              value={profile.targetRole}
              onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
            >
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Software Engineer">Software Engineer</option>
            </select>
          </div>

          <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "1.5rem 0" }} />

          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.25rem" }}>My Technical Skills</h3>

          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Skill name (e.g. Python, React, SQL)"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <select
              className="form-control"
              style={{ width: "160px" }}
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
            >
              <option value={1}>1 - Beginner</option>
              <option value={2}>2 - Elementary</option>
              <option value={3}>3 - Intermediate</option>
              <option value={4}>4 - Advanced</option>
              <option value={5}>5 - Expert</option>
            </select>
            <button type="button" onClick={handleAddSkill} className="btn btn-secondary">
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-primary"
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.85rem", gap: "0.5rem" }}
              >
                <span>{skill.name} (Lvl {skill.level})</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit" }}
                >
                  <Trash2 size={13} />
                </button>
              </span>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.75rem" }}>
            <Save size={18} />
            <span>Save Profile Changes</span>
          </button>
        </form>
      </main>
    </div>
  );
};

export default Profile;
