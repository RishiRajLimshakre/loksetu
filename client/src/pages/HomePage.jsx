import { useEffect, useState } from "react";
import api from "../api/axios";
import IssueCard from "../components/IssueCard";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { token, user } = useAuth();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleUpvote = async (issueId) => {
    if (!user) {
      alert("Please login to upvote issues");
      return;
    }

    try {
      await api.post(
        `/issues/${issueId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchIssues();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to upvote");
    }
  };

  if (loading) {
    return <p>Loading issues...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>All Issues</h1>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} onUpvote={handleUpvote} />
        ))
      )}
    </div>
  );
};

export default HomePage;