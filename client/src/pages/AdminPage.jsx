import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const { token } = useAuth();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setError("");

        const response = await api.get("/issues");
        setIssues(response.data.issues);
      } catch (err) {
        setError("Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await api.patch(
        `/issues/${issueId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId ? { ...issue, status: newStatus } : issue,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return <p>Loading admin panel...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="page-shell">
      <div className="page-card">
        <h1 className="page-title">Admin Panel</h1>
        <p className="page-subtext">
          Manage reported civic issues and update their current status.
        </p>

        {issues.length === 0 ? (
          <p className="page-subtext">No issues found.</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {issues.map((issue) => (
              <div
                key={issue._id}
                style={{
                  padding: "14px",
                  borderRadius: "16px",
                  background: "rgba(19, 27, 39, 0.88)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <h3 style={{ marginBottom: "8px" }}>{issue.title}</h3>
                <p className="page-subtext" style={{ marginBottom: "8px" }}>
                  Reported by: {issue.reportedBy?.name || "Anonymous"}
                </p>
                <p className="page-subtext" style={{ marginBottom: "8px" }}>
                  Category: {issue.category}
                </p>

                <label className="form-label">Update Status</label>
                <select
                  value={issue.status}
                  onChange={(e) =>
                    handleStatusChange(issue._id, e.target.value)
                  }
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="escalated">Escalated</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPage;
