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
  Header,
  HeaderTitle,
  HeaderSubtitle,
  SearchContainer,
  SearchInput,
  SearchIcon,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  ContentSection,
  SectionTitle,
  SectionSubtitle,
  OrgGrid,
  OrgCard,
  OrgAvatar,
  OrgInfo,
  OrgName,
  OrgEmail,
  OrgActions,
  ActionButton,
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
          <>
            <Header>
              <HeaderTitle>Organizations</HeaderTitle>
              <HeaderSubtitle>Manage and monitor your organization network</HeaderSubtitle>
            </Header>

            <StatsGrid>
              <StatCard>
                <StatIcon>🏢</StatIcon>
                <StatValue>{organizations.length}</StatValue>
                <StatLabel>Total Organizations</StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon>✅</StatIcon>
                <StatValue>{organizations.filter(org => org.status !== 'inactive').length}</StatValue>
                <StatLabel>Active Organizations</StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon>📊</StatIcon>
                <StatValue>{filteredOrgs.length}</StatValue>
                <StatLabel>Filtered Results</StatLabel>
              </StatCard>
            </StatsGrid>

            <ContentSection>
              <SectionTitle>Organization Directory</SectionTitle>
              <SectionSubtitle>Search and manage your organizations</SectionSubtitle>

              <SearchContainer>
                <SearchIcon>🔍</SearchIcon>
                <SearchInput
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </SearchContainer>

              {filteredOrgs.length > 0 ? (
                <OrgGrid>
                  {filteredOrgs.map((org) => (
                    <OrgCard key={org._id}>
                      <OrgAvatar>
                        {org.name.charAt(0).toUpperCase()}
                      </OrgAvatar>
                      <OrgInfo>
                        <OrgName>{org.name}</OrgName>
                        <OrgEmail>{org.email}</OrgEmail>
                      </OrgInfo>
                      <OrgActions>
                        <ActionButton
                          onClick={() => handleEdit(org)}
                          variant="edit"
                        >
                          ✏️ Edit
                        </ActionButton>
                        <ActionButton
                          onClick={() => confirmDelete(org)}
                          variant="delete"
                        >
                          🗑️ Delete
                        </ActionButton>
                      </OrgActions>
                    </OrgCard>
                  ))}
                </OrgGrid>
              ) : (
                <EmptyState>
                  <EmptyIcon>📋</EmptyIcon>
                  <EmptyTitle>No Organizations Found</EmptyTitle>
                  <EmptySubtitle>
                    {search ? 'Try adjusting your search terms' : 'Get started by adding your first organization'}
                  </EmptySubtitle>
                </EmptyState>
              )}
            </ContentSection>
          </>
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

      {/* Delete Confirmation Modal */}
      {deleteOrg && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <ModalTitle>🗑️ Confirm Delete</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>Are you sure you want to delete <strong>"{deleteOrg.name}"</strong>? This action cannot be undone.</p>
            </ModalContent>
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
