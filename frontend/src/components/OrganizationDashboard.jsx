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
  Header,
  HeaderTitle,
  HeaderSubtitle,
  ContentSection,
  SectionTitle,
  UserGrid,
  UserCard,
  UserAvatar,
  UserInfo,
  UserName,
  UserEmail,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
  LoadingOverlay,
  Spinner,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalActions,
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
          <>
            <Header>
              <HeaderTitle>User Management</HeaderTitle>
              <HeaderSubtitle>Manage and monitor your organization's users</HeaderSubtitle>
            </Header>

            <ContentSection>
              <SectionTitle>Registered Users ({users.length})</SectionTitle>

              {users.length > 0 ? (
                <UserGrid>
                  {users.map((user) => (
                    <UserCard key={user._id}>
                      <UserAvatar>
                        {user.email.charAt(0).toUpperCase()}
                      </UserAvatar>
                      <UserInfo>
                        <UserName>{user.email}</UserName>
                        <UserEmail>Organization User</UserEmail>
                      </UserInfo>
                    </UserCard>
                  ))}
                </UserGrid>
              ) : (
                <EmptyState>
                  <EmptyIcon>👥</EmptyIcon>
                  <EmptyTitle>No Users Found</EmptyTitle>
                  <EmptySubtitle>Start by adding users to your organization.</EmptySubtitle>
                </EmptyState>
              )}
            </ContentSection>
          </>
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
            <ModalHeader>
              <ModalTitle>⚠️ Error</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>{error}</p>
            </ModalContent>
            <ModalActions>
              <CloseButton onClick={() => setError("")}>Close</CloseButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}

      {/* Success Modal */}
      {success && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <ModalTitle>✅ Success</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>{success}</p>
            </ModalContent>
            <ModalActions>
              <CloseButton onClick={() => setSuccess("")}>Close</CloseButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
}

export default OrganizationDashboard;
