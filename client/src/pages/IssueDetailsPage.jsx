import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const IssueDetailsPage = () => {
  const { id } = useParams();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setError("");
        const response = await api.get(`/issues/${id}`);
        setIssue(response.data.issue);
      } catch (err) {
        setError("Failed to fetch issue details");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  if (loading) {
    return <p>Loading issue details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!issue) {
    return <p>Issue not found</p>;
  }

  return (
    <section className="page-shell">
      <div className="page-card">
        <p className="page-subtext">
          Reported by {issue.reportedBy?.name || "Anonymous"}
        </p>

        <h1 className="page-title">{issue.title}</h1>

        {issue.imageUrl && (
          <img
            src={issue.imageUrl}
            alt={issue.title}
            style={{
              marginBottom: "18px",
              borderRadius: "18px",
              width: "100%",
              maxHeight: "380px",
              objectFit: "cover",
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "18px",
          }}
        >
          <span className="issue-card__badge">{issue.category}</span>
          <span className="issue-card__status">{issue.status}</span>
          <span className="issue-card__badge">
            Upvotes: {issue.upvotesCount}
          </span>
        </div>

        {issue.escalationMessage && (
          <div
            style={{
              marginBottom: "18px",
              padding: "14px",
              borderRadius: "16px",
              background: "rgba(249, 115, 22, 0.10)",
              border: "1px solid rgba(249, 115, 22, 0.22)",
              color: "#fdba74",
            }}
          >
            <p
              className="form-label"
              style={{ marginBottom: "6px", color: "#fdba74" }}
            >
              Escalation Notice
            </p>
            <p>{issue.escalationMessage}</p>
          </div>
        )}

        <div className="form-group">
          <p className="form-label">Description</p>
          <p className="page-subtext" style={{ color: "#e2e8f0" }}>
            {issue.description}
          </p>
        </div>

        <div className="form-group">
          <p className="form-label">Address</p>
          <p className="page-subtext" style={{ color: "#e2e8f0" }}>
            {issue.addressText || "No address provided"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IssueDetailsPage;
