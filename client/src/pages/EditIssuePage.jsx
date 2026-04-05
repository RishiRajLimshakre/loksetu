import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import IssueCardSkeleton from "../components/IssueCardSkeleton";

const EditIssuePage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    addressText: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setError("");

        const response = await api.get(`/issues/${id}`);
        const issue = response.data.issue;

        setFormData({
          title: issue.title || "",
          description: issue.description || "",
          category: issue.category || "",
          addressText: issue.addressText || "",
        });
      } catch (err) {
        setError("Failed to load issue data");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await api.patch(`/issues/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/my-reports");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update issue");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="feed-page">
        <div className="feed-page__inner">
          <h1 className="feed-page__title">Edit Report</h1>
          <IssueCardSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="page-card">
        <h1 className="page-title">Edit Report</h1>
        <p className="page-subtext">
          Update your report details and keep the issue information accurate.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter issue title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="pothole">Pothole</option>
              <option value="garbage">Garbage</option>
              <option value="streetlight">Streetlight</option>
              <option value="drainage">Drainage</option>
              <option value="water_leakage">Water Leakage</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="addressText"
              value={formData.addressText}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          {error && <p className="message-error">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Report"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditIssuePage;