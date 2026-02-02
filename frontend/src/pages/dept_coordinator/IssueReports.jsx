import React, { useEffect, useState } from "react";
import { FaPlus, FaPaperPlane } from "react-icons/fa";
import { authFetch } from "../../utils/authFetch";
import "./DeptCoordinatorDashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function IssueReports() {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dept_issues") || "[]";
      setReports(JSON.parse(raw));
    } catch (e) {
      setReports([]);
    }
  }, []);

  const saveReports = (next) => {
    localStorage.setItem("dept_issues", JSON.stringify(next));
    setReports(next);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;
    const item = {
      id: Date.now(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      date: new Date().toISOString(),
    };
    // Try sending to backend; if fails, fallback to localStorage
    (async () => {
      try {
        const res = await authFetch(`${API_BASE}/api/issues`, {
          method: "POST",
          body: JSON.stringify({ subject: item.subject, message: item.message })
        });
        if (res.ok) {
          const data = await res.json();
          const saved = data.issue || item;
          const next = [saved, ...reports];
          saveReports(next);
        } else {
          const next = [item, ...reports];
          saveReports(next);
        }
      } catch (err) {
        const next = [item, ...reports];
        saveReports(next);
      }
    })();
    setForm({ subject: "", message: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const next = reports.filter((r) => r.id !== id);
    saveReports(next);
  };

  return (
    <div className="dashboard-container dashboard-theme">
      <header className="dashboard-header">
        <h1>Issue Reports</h1>
        <div className="header-buttons">
          <button onClick={() => setShowForm((s) => !s)}>
            <FaPlus /> {showForm ? "Close" : "Add Issue"}
          </button>
        </div>
      </header>

      {showForm && (
        <div className="request-modal" style={{ width: "640px", margin: "12px auto" }}>
          <h2>Add Issue</h2>
          <form className="request-form" onSubmit={handleSubmit}>
            <label>
              Subject
              <input name="subject" value={form.subject} onChange={handleChange} />
            </label>
            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} />
            </label>
            <div className="form-buttons">
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit"> Submit</button>
            </div>
          </form>
        </div>
      )}

      <div className="issues-list" style={{ marginTop: 12 }}>
        {reports.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No past issue reports.</p>
        ) : (
          reports.map((r) => (
            <div className="issue-item card" key={r.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ display: "block", fontSize: "1rem" }}>{r.subject}</strong>
                  <small style={{ color: "#94a3b8" }}>{new Date(r.date).toLocaleString()}</small>
                </div>
                <div className="actions">
                  <button onClick={() => handleDelete(r.id)}>Delete</button>
                </div>
              </div>
              <p style={{ marginTop: 10, color: "#e6eef8" }}>{r.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

