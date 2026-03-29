import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const CreateIssuePage = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    addressText: "",
    longitude: "",
    latitude: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setFormData((prev) => ({
          ...prev,
          longitude: String(longitude),
          latitude: String(latitude),
        }));
      },
      () => {
        setError("Unable to fetch your location");
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const issueFormData = new FormData(); // this create multipart form data object

      issueFormData.append("title", formData.title);
      issueFormData.append("description", formData.description);
      issueFormData.append("category", formData.category);
      issueFormData.append("addressText", formData.addressText);
      issueFormData.append("longitude", formData.longitude);
      issueFormData.append("latitude", formData.latitude);

      if (image) {
        issueFormData.append("image", image);
      }

      const response = await api.post("/issues", issueFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);

      setFormData({
        title: "",
        description: "",
        category: "",
        addressText: "",
        longitude: "",
        latitude: "",
      });
      setImage(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Issue</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter issue title"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue"
          />
        </div>

        <div>
          <label>Category</label>
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

        <div>
          <label>Address</label>
          <input
            type="text"
            name="addressText"
            value={formData.addressText}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <div>
          <label>Longitude</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Enter longitude"
          />
        </div>

        <div>
          <label>Latitude</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Enter latitude"
          />
        </div>
        <button type="button" onClick={handleUseCurrentLocation}>
          Use Current Location
        </button>

        <div>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default CreateIssuePage;
