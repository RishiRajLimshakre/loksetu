import { useEffect, useState } from "react";
import api from "../api/axios";
import "./HomePage.css";
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

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await api.get("/issues", config);
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

 const handleUpvote = async (issueId, hasUpvoted) => {
  if (!user) {
    alert("Please login to vote on issues");
    return;
  }

  try {
    if (hasUpvoted) {
      await api.delete(`/issues/${issueId}/upvote`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await api.post(
        `/issues/${issueId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    fetchIssues();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to update vote");
  }
};

  if (loading) {
    return <p>Loading issues...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
return (
  <section className="feed-page">
    <div className="feed-page__inner">
      <h1 className="feed-page__title">All Issues</h1>

      {issues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} onUpvote={handleUpvote} />
        ))
      )}
    </div>
  </section>
);
};

export default HomePage;