import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  DashboardContainer,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  CompanyCard,
  CompanyInfo,
  CompanyName,
  CompanyEmail,
  Timer,
  TimerText,
  TimerExpired,
  StudentSection,
  SectionTitle,
  StudentGrid,
  StudentCard,
  StudentAvatar,
  StudentInfo,
  StudentName,
  StudentEmail,
  StudentDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  BackButton,
  DetailCard,
  DetailHeader,
  DetailTitle,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle
} from "./VerifierDashboard.styles";
import UserCredential from "./UserCredentials";

function VerifierDashboard() {
  const [invite, setInvite] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  // Fetch invite + students
  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const token = localStorage.getItem("verifierToken");
        const res = await api.get(`/verifier/students?token=${token}`);
        const res1 = await api.get(`/verifier/validate?token=${token}`);


        setInvite(res1.data.invite || null);
        setStudents(res.data.students || []);
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };
    fetchInvite();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!invite?.expiresAt) return;

    const interval = setInterval(() => {
      const diff = new Date(invite.expiresAt) - new Date();
      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [invite]);

  if (selectedStudent) {
    return (
      <DashboardContainer>
        <Header>
          <BackButton onClick={() => setSelectedStudent(null)}>← Back to Students</BackButton>
          <HeaderTitle>Student Details</HeaderTitle>
          <HeaderSubtitle>View and verify student credentials</HeaderSubtitle>
        </Header>

        {/* Detailed View */}
        <DetailCard>
          <DetailHeader>
            <StudentAvatar>
              {(selectedStudent.name || selectedStudent.user?.email || "S").charAt(0).toUpperCase()}
            </StudentAvatar>
            <DetailTitle>{selectedStudent.name || "Unnamed Student"}</DetailTitle>
          </DetailHeader>

          <StudentDetails>
            <DetailItem>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{selectedStudent.user?.email}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Register No</DetailLabel>
              <DetailValue>{selectedStudent.registerNo}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Degree</DetailLabel>
              <DetailValue>{selectedStudent.degree}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Branch</DetailLabel>
              <DetailValue>{selectedStudent.branch}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Mode</DetailLabel>
              <DetailValue>{selectedStudent.mode}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Regulations</DetailLabel>
              <DetailValue>{selectedStudent.regulations}</DetailValue>
            </DetailItem>
          </StudentDetails>
        </DetailCard>

        {/* Credentials */}
        <UserCredential userId={selectedStudent.user._id} mode="verifier" />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <HeaderTitle>Verifier Dashboard</HeaderTitle>
        <HeaderSubtitle>Verify student credentials and academic records</HeaderSubtitle>
      </Header>

      {invite && (
        <CompanyCard>
          <CompanyInfo>
            <CompanyName>{invite.companyName}</CompanyName>
            <CompanyEmail>{invite.companyEmail}</CompanyEmail>
          </CompanyInfo>
          <Timer>
            {timeLeft === "Expired" ? (
              <TimerExpired>⏰ Link expired</TimerExpired>
            ) : (
              <TimerText>⏳ Expires in {timeLeft}</TimerText>
            )}
          </Timer>
        </CompanyCard>
      )}

      <StudentSection>
        <SectionTitle>Students ({students.length})</SectionTitle>
        <StudentGrid>
          {students.length > 0 ? (
            students.map((s) => (
              <StudentCard key={s._id} onClick={() => setSelectedStudent(s)}>
                <StudentAvatar>
                  {(s.name || s.user?.email || "S").charAt(0).toUpperCase()}
                </StudentAvatar>
                <StudentInfo>
                  <StudentName>{s.name || "Unnamed Student"}</StudentName>
                  <StudentEmail>{s.user?.email}</StudentEmail>
                  <StudentDetails>
                    <DetailItem>
                      <DetailLabel>Reg No:</DetailLabel>
                      <DetailValue>{s.registerNo}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Degree:</DetailLabel>
                      <DetailValue>{s.degree}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Branch:</DetailLabel>
                      <DetailValue>{s.branch}</DetailValue>
                    </DetailItem>
                  </StudentDetails>
                </StudentInfo>
              </StudentCard>
            ))
          ) : (
            <EmptyState>
              <EmptyIcon>👥</EmptyIcon>
              <EmptyTitle>No Students Found</EmptyTitle>
              <EmptySubtitle>No students have been assigned to this verifier yet.</EmptySubtitle>
            </EmptyState>
          )}
        </StudentGrid>
      </StudentSection>
    </DashboardContainer>
  );
}

export default VerifierDashboard;
