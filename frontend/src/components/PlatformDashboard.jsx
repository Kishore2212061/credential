// PlatformDashboard.js
import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import AddOrganization from "./AddOrganization";
import {
  DashboardWrapper,
  Sidebar,
  SidebarTitle,
  SidebarMenu,
  SidebarMenuItem,
  MainContent,
  SearchInput,
  OrgTable,
  LoadingOverlay,
  Spinner,
  ModalOverlay,
  Modal,
  ModalActions,
  CloseButton,
  CancelButton,
  DeleteConfirmButton
} from "./PlatformDashboard.styles";

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
    <DashboardWrapper>
      {/* Sidebar */}
      <Sidebar>
        <SidebarTitle>Platform Dashboard</SidebarTitle>
        <SidebarMenu>
          <SidebarMenuItem
            className={activeTab === "list" ? "active" : ""}
            onClick={() => {
              setActiveTab("list");
              setEditOrg(null);
            }}
          >
            Organization List
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "add" ? "active" : ""}
            onClick={() => {
              setActiveTab("add");
              setEditOrg(null);
            }}
          >
            Add Organization
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {activeTab === "add" ? (
          <AddOrganization
            onAdd={fetchOrganizations}
            editOrg={editOrg}
            clearEdit={() => setEditOrg(null)}
          />
        ) : (
          <div>
            <h3>Organizations</h3>
            <SearchInput
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <OrgTable>
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
            </OrgTable>
          </div>
        )}
      </MainContent>

      {/* Loading Overlay */}
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}

      {/* Error Modal */}
      {error && (
        <ModalOverlay>
          <Modal>
            <h3>Error</h3>
            <p>{error}</p>
            <CloseButton onClick={() => setError("")}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}

      {/* Success Modal */}
      {success && (
        <ModalOverlay>
          <Modal>
            <h3>Success</h3>
            <p>{success}</p>
            <CloseButton onClick={() => setSuccess("")}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOrg && (
        <ModalOverlay>
          <Modal>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteOrg.name}"?</p>
            <ModalActions>
              <CancelButton onClick={handleCancelDelete}>Cancel</CancelButton>
              <DeleteConfirmButton onClick={handleDelete}>Delete</DeleteConfirmButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </DashboardWrapper>
  );
}

export default PlatformDashboard;
