import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

function UserProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get("/user/me");
        setProfile(res.data || {});
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.put("/user/me", profile);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h4 className="profile-title">My Profile</h4>

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profile.name || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={profile.degree || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={profile.branch || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mode"
          placeholder="Mode"
          value={profile.mode || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="registerNo"
          placeholder="Register No"
          value={profile.registerNo || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="regulations"
          placeholder="Regulations"
          value={profile.regulations || ""}
          onChange={handleChange}
        />

        <button type="submit" className="profile-btn">
          Update Profile
        </button>
      </form>

      {/* Loader Modal */}
      {loading && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="loader"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {error && (
        <div className="modal-overlay">
          <div className="modal error">
            <p>{error}</p>
            <button onClick={() => setError("")}>Close</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="modal-overlay">
          <div className="modal success">
            <p>{success}</p>
            <button onClick={() => setSuccess("")}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
