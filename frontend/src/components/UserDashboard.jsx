import React, { useState, useEffect } from "react";
import { api, getId } from "../utils/api";
import UserProfile from "./UserProfile";
import UserCredential from "./UserCredentials";
import { motion, AnimatePresence } from "framer-motion";
import {
  DashboardContainer,
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarMenu,
  SidebarMenuItem,
  MainContent,
  ContentHeader,
  HeaderTitle,
  HeaderSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  SemesterGrid,
  SemesterCard,
  SemesterHeader,
  SemesterNumber,
  SemesterDate,
  SubjectList,
  SubjectItem,
  Loader,
  ErrorModal,
  SuccessModal,
  EmptyState,
  GradientBackground
} from "./UserDashboard.styles";

function UserDashboard() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchSemesters = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/semester/${getId()}`);
        setSemesters(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load semesters");
      } finally {
        setLoading(false);
      }
    };
    fetchSemesters();
  }, []);

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
    <DashboardContainer>
      <GradientBackground />
      
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <div className="avatar">👤</div>
          <SidebarTitle>Student Portal</SidebarTitle>
        </SidebarHeader>
        
        <SidebarMenu>
          <SidebarMenuItem
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>👤</span>
            My Profile
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "semesters" ? "active" : ""}
            onClick={() => setActiveTab("semesters")}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📚</span>
            Academic Records
          </SidebarMenuItem>
          <SidebarMenuItem
            className={activeTab === "credentials" ? "active" : ""}
            onClick={() => setActiveTab("credentials")}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>🎓</span>
            Digital Credentials
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContentHeader>
                <HeaderTitle>My Profile</HeaderTitle>
                <HeaderSubtitle>Manage your personal information</HeaderSubtitle>
              </ContentHeader>
              <UserProfile />
            </motion.div>
          )}

          {activeTab === "semesters" && (
            <motion.div
              key="semesters"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContentHeader>
                <HeaderTitle>Academic Records</HeaderTitle>
                <HeaderSubtitle>View your semester-wise academic performance</HeaderSubtitle>
              </ContentHeader>

              <StatsGrid
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <StatCard variants={itemVariants}>
                  <StatIcon>📊</StatIcon>
                  <StatValue>{semesters.length}</StatValue>
                  <StatLabel>Total Semesters</StatLabel>
                </StatCard>
                <StatCard variants={itemVariants}>
                  <StatIcon>📈</StatIcon>
                  <StatValue>
                    {semesters.length > 0 
                      ? (semesters.reduce((sum, sem) => sum + (sem.gpa || 0), 0) / semesters.length).toFixed(2)
                      : "0.00"
                    }
                  </StatValue>
                  <StatLabel>Average GPA</StatLabel>
                </StatCard>
                <StatCard variants={itemVariants}>
                  <StatIcon>🎯</StatIcon>
                  <StatValue>
                    {semesters.length > 0 && semesters[semesters.length - 1].cgpa 
                      ? semesters[semesters.length - 1].cgpa.toFixed(2)
                      : "0.00"
                    }
                  </StatValue>
                  <StatLabel>Current CGPA</StatLabel>
                </StatCard>
              </StatsGrid>

              {loading && <Loader>Loading academic records...</Loader>}
              
              {!loading && semesters.length > 0 ? (
                <SemesterGrid
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {semesters.map((sem, index) => (
                    <SemesterCard
                      key={sem._id}
                      variants={itemVariants}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SemesterHeader>
                        <SemesterNumber>Semester {sem.semesterNumber}</SemesterNumber>
                        <SemesterDate>
                          {new Date(sem.dateOfPublication).toLocaleDateString("en-GB")}
                        </SemesterDate>
                      </SemesterHeader>
                      
                      <div className="semester-info">
                        <p><strong>Exam:</strong> {sem.monthYearOfExam}</p>
                        {sem.gpa && <p><strong>GPA:</strong> {sem.gpa}</p>}
                        {sem.cgpa && <p><strong>CGPA:</strong> {sem.cgpa}</p>}
                      </div>

                      <SubjectList>
                        {sem.subjects.map((sub, i) => (
                          <SubjectItem key={i}>
                            <div className="subject-info">
                              <strong>{sub.subjectTitle}</strong>
                              <span className="subject-code">{sub.subjectCode}</span>
                            </div>
                            <div className="subject-grade">
                              <span className={`grade grade-${sub.grade?.toLowerCase()}`}>
                                {sub.grade}
                              </span>
                            </div>
                          </SubjectItem>
                        ))}
                      </SubjectList>
                    </SemesterCard>
                  ))}
                </SemesterGrid>
              ) : !loading && (
                <EmptyState
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div>
                    <span>📚</span>
                    <h3>No academic records found</h3>
                    <p>Your semester results will appear here once they're published</p>
                  </div>
                </EmptyState>
              )}
            </motion.div>
          )}

          {activeTab === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContentHeader>
                <HeaderTitle>Digital Credentials</HeaderTitle>
                <HeaderSubtitle>View and verify your blockchain-secured certificates</HeaderSubtitle>
              </ContentHeader>
              <UserCredential userId={getId()} mode="user" />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <ErrorModal
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div>
              <span>❌</span>
              <p>{error}</p>
              <button onClick={() => setError("")}>Dismiss</button>
            </div>
          </ErrorModal>
        )}

        {success && (
          <SuccessModal
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div>
              <span>✅</span>
              <p>{success}</p>
              <button onClick={() => setSuccess("")}>Dismiss</button>
            </div>
          </SuccessModal>
        )}
      </MainContent>
    </DashboardContainer>
  );
}

export default UserDashboard;