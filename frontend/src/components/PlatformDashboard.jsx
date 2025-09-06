import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import AddOrganization from "./AddOrganization";
import { motion, AnimatePresence } from "framer-motion";
import {
  DashboardWrapper,
  Sidebar,
  SidebarTitle,
  SidebarMenu,
  SidebarMenuItem,
  MainContent,
  DashboardHeader,
  HeaderTitle,
  HeaderSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  SearchInput,
  OrgTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  LoadingOverlay,
  Spinner,
  ModalOverlay,
  Modal,
  ModalActions,
  CloseButton,
  CancelButton,
  DeleteConfirmButton,
  EmptyState,
  FloatingActionButton
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
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
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📊</span>
            Organization List
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "add" ? "active" : ""}
            onClick={() => {
              setActiveTab("add");
              setEditOrg(null);
            }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>➕</span>
            Add Organization
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <AnimatePresence mode="wait">
          {activeTab === "add" ? (
            <motion.div
              key="add"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AddOrganization
                onAdd={fetchOrganizations}
                editOrg={editOrg}
                clearEdit={() => setEditOrg(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardHeader>
                <div>
                  <HeaderTitle>Organizations</HeaderTitle>
                  <HeaderSubtitle>Manage and monitor all organizations</HeaderSubtitle>
                </div>
                <FloatingActionButton
                  onClick={() => setActiveTab("add")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ➕
                </FloatingActionButton>
              </DashboardHeader>

              <StatsGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <StatCard variants={itemVariants}>
                  <StatIcon>🏢</StatIcon>
                  <StatValue>{organizations.length}</StatValue>
                  <StatLabel>Total Organizations</StatLabel>
                </StatCard>
                <StatCard variants={itemVariants}>
                  <StatIcon>✅</StatIcon>
                  <StatValue>{organizations.filter(org => org.createdAt).length}</StatValue>
                  <StatLabel>Active Organizations</StatLabel>
                </StatCard>
                <StatCard variants={itemVariants}>
                  <StatIcon>📈</StatIcon>
                  <StatValue>{filteredOrgs.length}</StatValue>
                  <StatLabel>Filtered Results</StatLabel>
                </StatCard>
              </StatsGrid>

              <SearchInput
                type="text"
                placeholder="🔍 Search organizations by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                whileFocus={{ scale: 1.02 }}
              />

              <OrgTable
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <TableHeader>
                  <TableCell>Organization</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableHeader>
                
                <AnimatePresence>
                  {filteredOrgs.length > 0 ? (
                    filteredOrgs.map((org, index) => (
                      <TableRow
                        key={org._id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01, backgroundColor: "#f8fafc" }}
                      >
                        <TableCell>
                          <div>
                            <strong>{org.name}</strong>
                            <small>ID: {org._id.slice(-6)}</small>
                          </div>
                        </TableCell>
                        <TableCell>{org.email}</TableCell>
                        <TableCell>
                          <ActionButton
                            className="edit"
                            onClick={() => handleEdit(org)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            ✏️ Edit
                          </ActionButton>
                          <ActionButton
                            className="delete"
                            onClick={() => confirmDelete(org)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            🗑️ Delete
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <EmptyState
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div>
                        <span>🏢</span>
                        <h3>No organizations found</h3>
                        <p>Get started by adding your first organization</p>
                      </div>
                    </EmptyState>
                  )}
                </AnimatePresence>
              </OrgTable>
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>

      {/* Loading Overlay */}
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}

      {/* Error Modal */}
      {error && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3>❌ Error</h3>
            <p>{error}</p>
            <CloseButton onClick={() => setError("")}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}

      {/* Success Modal */}
      {success && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3>✅ Success</h3>
            <p>{success}</p>
            <CloseButton onClick={() => setSuccess("")}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOrg && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3>⚠️ Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteOrg.name}"? This action cannot be undone.</p>
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