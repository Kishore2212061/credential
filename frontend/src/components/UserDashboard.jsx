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
  Header,
  HeaderTitle,
  HeaderSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  ContentSection,
  SectionTitle,
  SectionSubtitle,
  SemesterGrid,
  SemesterCard,
  SemesterHeader,
  SemesterNumber,
  SemesterDate,
  SemesterSubjects,
  SubjectItem,
  SubjectTitle,
  SubjectGrade,
  Loader,
  ErrorModal,
  SuccessModal,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
  TabNavigation,
  TabButton,
  TabContent,
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
        <h2>Dashboard</h2>
        <TabNavigation>
          <TabButton
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            👤 My Profile
          </TabButton>
          <TabButton
            className={activeTab === "semesters" ? "active" : ""}
            onClick={() => setActiveTab("semesters")}
          >
            📚 Semesters
          </TabButton>
          <TabButton
            className={activeTab === "credentials" ? "active" : ""}
            onClick={() => setActiveTab("credentials")}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            🎓 Credentials
          </TabButton>
        </TabNavigation>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <Header>
          <HeaderTitle>User Dashboard</HeaderTitle>
          <HeaderSubtitle>Manage your academic records and credentials</HeaderSubtitle>
        </Header>

        {loading && <Loader>Loading...</Loader>}
        {error && <ErrorModal>{error}</ErrorModal>}
        {success && <SuccessModal>{success}</SuccessModal>}

        <TabContent>
          {activeTab === "profile" && <UserProfile />}

          {activeTab === "semesters" && (
            <>
              <StatsGrid>
                <StatCard>
                  <StatIcon>📚</StatIcon>
                  <StatValue>{semesters.length}</StatValue>
                  <StatLabel>Total Semesters</StatLabel>
                </StatCard>
                <StatCard>
                  <StatIcon>📊</StatIcon>
                  <StatValue>
                    {semesters.reduce((total, sem) => total + sem.subjects.length, 0)}
                  </StatValue>
                  <StatLabel>Total Subjects</StatLabel>
                </StatCard>
                <StatCard>
                  <StatIcon>⭐</StatIcon>
                  <StatValue>
                    {semesters.length > 0 ?
                      (semesters.reduce((total, sem) =>
                        total + sem.subjects.reduce((subTotal, sub) => subTotal + (sub.grade === 'A' ? 4 : sub.grade === 'B' ? 3 : sub.grade === 'C' ? 2 : 1), 0), 0
                      ) / semesters.reduce((total, sem) => total + sem.subjects.length, 0)).toFixed(1) : '0.0'
                    }
                  </StatValue>
                  <StatLabel>Average GPA</StatLabel>
                </StatCard>
              </StatsGrid>

              <ContentSection>
                <SectionTitle>Academic Semesters</SectionTitle>
                <SectionSubtitle>Your complete academic record</SectionSubtitle>

                {semesters.length > 0 ? (
                  <SemesterGrid>
                    {semesters.map((sem) => (
                      <SemesterCard key={sem._id}>
                        <SemesterHeader>
                          <SemesterNumber>Semester {sem.semesterNumber}</SemesterNumber>
                          <SemesterDate>{sem.monthYearOfExam}</SemesterDate>
                        </SemesterHeader>
                        <SemesterSubjects>
                          {sem.subjects.map((sub, i) => (
                            <SubjectItem key={i}>
                              <SubjectTitle>{sub.subjectTitle}</SubjectTitle>
                              <SubjectGrade grade={sub.grade}>{sub.grade}</SubjectGrade>
                            </SubjectItem>
                          ))}
                        </SemesterSubjects>
                        <div style={{
                          fontSize: '12px',
                          color: '#64748b',
                          marginTop: '16px',
                          padding: '8px 12px',
                          background: 'rgba(59, 130, 246, 0.1)',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          Published: {new Date(sem.dateOfPublication).toLocaleDateString("en-GB")}
                        </div>
                      </SemesterCard>
                    ))}
                  </SemesterGrid>
                ) : (
                  !loading && (
                    <EmptyState>
                      <EmptyIcon>📚</EmptyIcon>
                      <EmptyTitle>No Semesters Found</EmptyTitle>
                      <EmptySubtitle>Your academic records will appear here once they are added.</EmptySubtitle>
                    </EmptyState>
                  )
                )}
              </ContentSection>
            </>
          )}

          {activeTab === "credentials" && <UserCredential userId={getId()} mode="user" />}
        </TabContent>
      </MainContent>
    </DashboardContainer>
  );
}

export default UserDashboard;