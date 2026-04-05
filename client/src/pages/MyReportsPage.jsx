import { useEffect, useState } from "react";
import api from "../api/axios";
import IssueCard from "../components/IssueCard";
import { useAuth } from "../context/AuthContext";
import IssueCardSkeleton from "../components/IssueCardSkeleton";

const MyReportsPage = () => {
  const { token } = useAuth();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        setError("");

        const response = await api.get("/issues/my/issues", {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleDelete = async (issueId) => {
    const isConfirmed =  window.confirm("Are you sure you want to delete this report?");
    
     if(!isConfirmed) return;  //it means if user cancels, stop function immediately

    try {
      await api.delete(`/issues/${issueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIssues((prevIssues) =>
        prevIssues.filter((issue) => issue._id !== issueId),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete report");
    }
  };

  if (loading) {
  return (
    <section className="feed-page">
      <div className="feed-page__inner">
        <h1 className="page-title">My Reports</h1>
        <p className="page-subtext">
          Track the civic issues you have reported and follow their progress.
        </p>
        <IssueCardSkeleton />
        <IssueCardSkeleton />
      </div>
    </section>
  );
}

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="feed-page">
      <div className="feed-page__inner">
        <h1 className="page-title">My Reports</h1>
        <p className="page-subtext">
          Track the civic issues you have reported and follow their progress.
        </p>
        <p className="page-subtext">Total reports: {issues.length}</p>

        {issues.length === 0 ? (
          <div className="page-card">
            <p className="page-subtext">
              You haven’t reported any civic issues yet.
            </p>
          </div>
        ) : (
          issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} onDelete={handleDelete} editLink={`/edit-issue/${issue._id}`} />
          ))
        )}
      </div>
    </section>
  );
};

export default MyReportsPage;
