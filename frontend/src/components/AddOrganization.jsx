import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

function AddOrganization({ onAdd, editOrg, clearEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editOrg) {
      setName(editOrg.name);
      setEmail(editOrg.email);
      setPassword(""); // password empty for security
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [editOrg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (editOrg) {
        await api.put(`/platform/organizations/${editOrg._id}`, {
          name,
          email,
          password,
        });
        setSuccess("Organization updated successfully!");
        clearEdit();
      } else {
        await api.post("/platform/organizations", {
          name,
          email,
          password,
        });
        setSuccess("Organization added successfully!");
      }
      setName("");
      setEmail("");
      setPassword("");
      onAdd();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-org-container">
      <div>
        <h3>{editOrg ? "Edit Organization" : "Add Organization"}</h3>
        <form className="add-org-form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {editOrg ? "Update Organization" : "Add Organization"}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        {/* Error Modal */}
        {error && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Error</h3>
              <p>{error}</p>
              <button className="close-btn" onClick={() => setError("")}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {success && (
          <div className="modal-overlay">
            <div className="modal success-modal">
              <h3>Success</h3>
              <p>{success}</p>
              <button className="close-btn" onClick={() => setSuccess("")}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddOrganization;
