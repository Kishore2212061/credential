import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  DashboardContainer,
  CompanyCard,
  Timer,
  StudentGrid,
  StudentCard,
  BackButton,
  DetailCard,
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
        <BackButton onClick={() => setSelectedStudent(null)}>← Back</BackButton>

        {/* Detailed View */}
        <DetailCard>
          <h2>{selectedStudent.name}</h2>
          <p><strong>Email:</strong> {selectedStudent.user?.email}</p>
          <p><strong>Register No:</strong> {selectedStudent.registerNo}</p>
          <p><strong>Degree:</strong> {selectedStudent.degree}</p>
          <p><strong>Branch:</strong> {selectedStudent.branch}</p>
          <p><strong>Mode:</strong> {selectedStudent.mode}</p>
          <p><strong>Regulations:</strong> {selectedStudent.regulations}</p>
        </DetailCard>

        {/* Credentials */}
        <UserCredential userId={selectedStudent.user._id} mode="verifier" />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {invite && (
        <CompanyCard>
          <h2>{invite.companyName}</h2>
          <p><strong>Email:</strong> {invite.companyEmail}</p>
          <Timer>
            {timeLeft === "Expired" ? (
              <span className="expired">⏰ Link expired</span>
            ) : (
              <span>⏳ Expires in {timeLeft}</span>
            )}
          </Timer>
        </CompanyCard>
      )}

      <h3>Students</h3>
      <StudentGrid>
        {students.length > 0 ? (
          students.map((s) => (
            <StudentCard key={s._id} onClick={() => setSelectedStudent(s)}>
              <h4>{s.name || "Unnamed Student"}</h4>
              <p>{s.user?.email}</p>
              <p><strong>Reg No:</strong> {s.registerNo}</p>
              <p><strong>Degree:</strong> {s.degree}</p>
              <p><strong>Branch:</strong> {s.branch}</p>
            </StudentCard>
          ))
        ) : (
          <p>No students found</p>
        )}
      </StudentGrid>
    </DashboardContainer>
  );
}

export default VerifierDashboard;
