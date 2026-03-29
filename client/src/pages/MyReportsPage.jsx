import { useEffect, useState } from "react";
import api from "../api/axios";
import IssueCard from "../components/IssueCard";
import { useAuth } from "../context/AuthContext";

const MyReportsPage = () => {
  const { token } = useAuth();  // by this we can get token from auth context

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        setError("");

        const response = await api.get("/issues/my/issues", {
          headers: {
            Authorization: `Bearer ${token}`,             //this is a config object , which sends token to backend
          },
        });

        setIssues(response.data.issues);
      } catch (err) {
        setError("Failed to fetch your reports");
      } finally {
        setLoading(false);
      }
    };

    fetchMyIssues();
  }, [token]);

  if (loading) {
    return <p>Loading your reports...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Reports</h1>

      {issues.length === 0 ? (
        <p>You have not reported any issues yet.</p>
      ) : (
        issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)
      )}
    </div>
  );
};

export default MyReportsPage;
