import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import AddUser from "./AddUser";
import SemesterForm from "./SemesterForm";
import TemplateForm from "./TemplateForm";
import IssueCredential from "./IssueCredential";
import CredentialList from "./CredentialList";
import VerifierOnboard from "./VerifierOnboard";

import {
  OrganizationDashboard as DashboardContainer,
  Sidebar,
  SidebarTitle,
  SidebarMenu,
  SidebarMenuItem,
  MainContent,
  UserTable,
  LoadingOverlay,
  Spinner,
  ModalOverlay,
  Modal,
  CloseButton,
} from "./OrganizationDashboard.styles";

function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState("userList");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/organization/users");
      setUsers(res.data || []);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarTitle>Organization Dashboard</SidebarTitle>
        <SidebarMenu>
          <SidebarMenuItem
            className={activeTab === "addUser" ? "active" : ""}
            onClick={() => setActiveTab("addUser")}
          >
            Add User
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "userList" ? "active" : ""}
            onClick={() => setActiveTab("userList")}
          >
            User List
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "semesterForm" ? "active" : ""}
            onClick={() => setActiveTab("semesterForm")}
          >
            Semester Form
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "templateForm" ? "active" : ""}
            onClick={() => setActiveTab("templateForm")}
          >
            Template Form
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "issueCredential" ? "active" : ""}
            onClick={() => setActiveTab("issueCredential")}
          >
            Issue Credential
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "credentialList" ? "active" : ""}
            onClick={() => setActiveTab("credentialList")}
          >
            Credential List
          </SidebarMenuItem>
                  <SidebarMenuItem
  className={activeTab === "inviteVerifier" ? "active" : ""}
  onClick={() => setActiveTab("inviteVerifier")}
>
  Invite Verifier
</SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {activeTab === "addUser" && (
          <AddUser
            onAdd={fetchUsers}
            setSuccess={setSuccess}
            setError={setError}
          />
        )}
        {activeTab === "userList" && (
          <div>
            <h3>User List</h3>
            <UserTable>
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="1" style={{ textAlign: "center" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </UserTable>
          </div>
        )}
        {activeTab === "semesterForm" && (
          <SemesterForm setSuccess={setSuccess} setError={setError} />
        )}
        {activeTab === "templateForm" && (
          <TemplateForm setSuccess={setSuccess} setError={setError} />
        )}
        {activeTab === "issueCredential" && (
          <IssueCredential setSuccess={setSuccess} setError={setError} />
        )}
        {activeTab === "credentialList" && (
          <CredentialList setSuccess={setSuccess} setError={setError} />
        )}
        {activeTab === "inviteVerifier" && (
  <VerifierOnboard setSuccess={setSuccess} setError={setError} />
)}

      </MainContent>

      {/* Loader */}
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
          <Modal className="success-modal">
            <h3>Success</h3>
            <p>{success}</p>
            <CloseButton onClick={() => setSuccess("")}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
}

export default OrganizationDashboard;
