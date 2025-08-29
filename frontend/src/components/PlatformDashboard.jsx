// PlatformDashboard.js
import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import AddOrganization from "./AddOrganization";

function PlatformDashboard() {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editOrg, setEditOrg] = useState(null);
  const [deleteOrg, setDeleteOrg] = useState(null);
  const [search, setSearch] = useState("");

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/platform/organizations");
      setOrganizations(res.data);
      setFilteredOrgs(res.data);
    } catch (err) {
      setError("Failed to fetch organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredOrgs(organizations);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredOrgs(
        organizations.filter(
          (org) =>
            org.name.toLowerCase().includes(lowerSearch) ||
            org.email.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [search, organizations]);

  const confirmDelete = (org) => setDeleteOrg(org);

  const handleDelete = async () => {
    if (!deleteOrg) return;
    setLoading(true);
    try {
      await api.delete(`/platform/organizations/${deleteOrg._id}`);
      setSuccess("Organization deleted successfully!");
      fetchOrganizations();
    } catch (err) {
      setError("Failed to delete organization");
    } finally {
      setLoading(false);
      setDeleteOrg(null);
    }
  };

  const handleCancelDelete = () => setDeleteOrg(null);

  const handleEdit = (org) => {
    setEditOrg(org);
    setActiveTab("add");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Platform Dashboard</h2>
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${activeTab === "list" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("list");
              setEditOrg(null);
            }}
          >
            Organization List
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === "add" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("add");
              setEditOrg(null);
            }}
          >
            Add Organization
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "add" ? (
          <AddOrganization
            onAdd={fetchOrganizations}
            editOrg={editOrg}
            clearEdit={() => setEditOrg(null)}
          />
        ) : (
          <div>
            <h3>Organizations</h3>
            <input
              className="search-input"
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <table className="org-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.length > 0 ? (
                  filteredOrgs.map((org) => (
                    <tr key={org._id}>
                      <td>{org.name}</td>
                      <td>{org.email}</td>
                      <td>
                        <button onClick={() => handleEdit(org)}>Edit</button>
                        <button onClick={() => confirmDelete(org)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No organizations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Loading Overlay */}
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
          <div className="modal">
            <h3>Success</h3>
            <p>{success}</p>
            <button className="close-btn" onClick={() => setSuccess("")}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOrg && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteOrg.name}"?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlatformDashboard;
