import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import API from "../services/api.js";
import { Send, Bot, User, Sparkles } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your **CareerSync AI Assistant**. How can I help you today with your target role, roadmap, or technical preparation?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);

    try {
      setLoading(true);
      const res = await API.post("/chat", { message: userMsg });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I'm having trouble connecting to the career advisory service right now. Please check your backend connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "How can I become a Data Scientist?",
    "Give me a 30-day preparation plan.",
    "Suggest standout capstone projects.",
    "What is my current readiness score?",
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "2rem 2.5rem", display: "flex", flexDirection: "column", height: "calc(100vh - 70px)" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <h1 style={{ fontSize: "1.9rem", marginBottom: "0.25rem" }}>AI Career Assistant</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Real-time guidance tailored to your enrolled target career and skill profile.
          </p>
        </div>

        {/* Chat Messages Container */}
        <div
          className="card"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            padding: 0,
          }}
        >
          {/* Scrollable Conversation */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                {msg.sender === "ai" && (
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--primary-light)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={20} />
                  </div>
                )}

                <div
                  style={{
                    background: msg.sender === "user" ? "var(--primary)" : "#f1f5f9",
                    color: msg.sender === "user" ? "#ffffff" : "var(--text-dark)",
                    padding: "0.85rem 1.15rem",
                    borderRadius: "14px",
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#e2e8f0",
                      color: "#475569",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", color: "var(--text-muted)", fontSize: "0.88rem" }}>
                <Bot size={18} />
                <span>CareerSync Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div
            style={{
              padding: "0.75rem 1.5rem",
              background: "#f8fafc",
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {quickPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => setInput(prompt)}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: "9999px",
                  padding: "0.3rem 0.75rem",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: "0.75rem",
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Ask anything about your tech career journey..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: "0 1.5rem" }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
