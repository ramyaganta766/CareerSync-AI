import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api.js";
import { CheckSquare, Award, AlertCircle, CheckCircle2 } from "lucide-react";

const Assessment = () => {
  const [skill, setSkill] = useState("Python");
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAssessment = async (selectedSkill) => {
    try {
      setLoading(true);
      setResult(null);
      setAnswers({});
      const res = await API.get(`/assessments/${selectedSkill.toLowerCase()}`);
      setAssessment(res.data);
    } catch (err) {
      console.warn("Failed to fetch assessment questions:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessment(skill);
  }, [skill]);

  const handleSelectOption = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/assessments/submit", {
        skill,
        answers,
      });
      setResult(res.data);
    } catch (err) {
      alert("Submission error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "2rem 2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.9rem", marginBottom: "0.25rem" }}>Skill Assessment & Validation</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            MCQ tests validated on the backend. Completing the test automatically updates your verified skill mastery.
          </p>
        </div>

        {/* Skill Selector */}
        <div className="card" style={{ maxWidth: "700px", marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <label className="form-label">Select Skill Test</label>
            <select
              className="form-control"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            >
              <option value="Python">Python Fundamentals & OOP</option>
              <option value="JavaScript">JavaScript ES6+ & Asynchronous</option>
            </select>
          </div>
        </div>

        {/* Test Questions */}
        {assessment && !result && (
          <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
            {assessment.questions.map((q, qIdx) => (
              <div key={qIdx} className="card" style={{ marginBottom: "1.25rem" }}>
                <h4 style={{ fontSize: "1rem", marginBottom: "1rem" }}>
                  {qIdx + 1}. {q.question}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {q.options.map((opt, oIdx) => (
                    <label
                      key={oIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.65rem 0.9rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        background: answers[qIdx] === oIdx ? "var(--primary-light)" : "#ffffff",
                        borderColor: answers[qIdx] === oIdx ? "var(--primary)" : "var(--border)",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${qIdx}`}
                        checked={answers[qIdx] === oIdx}
                        onChange={() => handleSelectOption(qIdx, oIdx)}
                        required
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-block"
              style={{ padding: "0.85rem" }}
            >
              {loading ? "Evaluating on Backend..." : "Submit Answers for Evaluation"}
            </button>
          </form>
        )}

        {/* Result Card */}
        {result && (
          <div className="card" style={{ maxWidth: "600px", textAlign: "center", padding: "2.5rem" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "#ecfdf5",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <Award size={36} />
            </div>

            <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
              Assessment Result: {result.score}%
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Correct: <strong>{result.correctCount}/{result.totalQuestions}</strong> questions
            </p>

            <div
              style={{
                background: "var(--bg-main)",
                padding: "1rem",
                borderRadius: "var(--radius-sm)",
                marginBottom: "1.5rem",
              }}
            >
              <div>Verified Mastery Level:</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary)" }}>
                Level {result.suggestedLevel} / 5 ({result.masteryLabel})
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Your student profile skill level has been automatically updated in MongoDB!
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="btn btn-secondary"
            >
              Take Another Test
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Assessment;
