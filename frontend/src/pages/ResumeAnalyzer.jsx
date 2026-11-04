import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api.js";
import { UploadCloud, CheckCircle2, AlertCircle, FileText } from "lucide-react";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setError("");
    } else {
      setError("Please select a valid PDF file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      return setError("Please select your PDF resume file first.");
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("targetRole", targetRole);

    try {
      setLoading(true);
      setError("");
      const res = await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to process resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "2rem 2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.9rem", marginBottom: "0.25rem" }}>AI Resume Analyzer</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Upload your resume PDF. Our backend extracts text via Multer & pdf-parse and validates your skill keywords.
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="card" style={{ maxWidth: "700px", marginBottom: "2rem" }}>
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label className="form-label">Target Role for Benchmarking</label>
              <select
                className="form-control"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
            </div>

            <div
              style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "var(--radius-md)",
                padding: "2.5rem 1.5rem",
                textAlign: "center",
                background: "#f8fafc",
                marginBottom: "1.5rem",
                cursor: "pointer",
              }}
            >
              <UploadCloud size={40} color="var(--primary)" style={{ margin: "0 auto 0.75rem" }} />
              <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                {file ? file.name : "Choose a PDF resume or drag it here"}
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Supports standard PDF files up to 10MB
              </p>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                style={{ marginTop: "1rem" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.8rem" }}
            >
              {loading ? "Analyzing Document..." : "Upload and Extract Skills"}
            </button>
          </form>
        </div>

        {result && (
          <div className="card" style={{ maxWidth: "700px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <CheckCircle2 color="#10b981" size={24} />
              <h3 style={{ fontSize: "1.2rem" }}>Analysis Complete</h3>
            </div>
            <p style={{ fontSize: "0.92rem", marginBottom: "1rem" }}>
              File: <strong>{result.fileName}</strong> | Skills identified:{" "}
              <strong>{result.totalSkillsFound}</strong>
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {result.extractedSkills?.map((skill, index) => (
                <span key={index} className="badge badge-success" style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}>
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ background: "var(--bg-main)", padding: "1rem", borderRadius: "var(--radius-sm)", fontSize: "0.85rem" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Parsed Text Snippet:</div>
              <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                "{result.sampleText}..."
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeAnalyzer;
