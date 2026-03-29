import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const IssueDetailsPage = () => {
  const { id } = useParams();  // this the route url will look like /issue/id(whatever it is)

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
  }, [id]);  // effect should re-run if route id changes.

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
    <div>
      {issue.imageUrl && (
        <img
          src={issue.imageUrl}
          alt={issue.title}
          style={{ width: "250px", height: "auto" }}
        />
      )}

      <h1>{issue.title}</h1>
      <p>{issue.description}</p>
      <p>Category: {issue.category}</p>
      <p>Status: {issue.status}</p>
      <p>Upvotes: {issue.upvotesCount}</p>
      <p>Address: {issue.addressText}</p>

      {issue.reportedBy && <p>Reported by: {issue.reportedBy.name}</p>}
    </div>
  );
};

export default IssueDetailsPage;
