import React, { useState, useEffect } from "react";
import { api, getId } from "../utils/api";
import UserProfile from "./UserProfile";
import UserCredential from "./UserCredentials";
import {
  DashboardContainer,
  Sidebar,
  MainContent,
  Loader,
  ErrorModal,
  SuccessModal,
  SemesterTable,
  EmptyState,
} from "./UserDashboard.styles";

function UserDashboard() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // profile | semesters | credentials

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

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <h2>Dashboard</h2>
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </li>
          <li
            className={activeTab === "semesters" ? "active" : ""}
            onClick={() => setActiveTab("semesters")}
          >
            Semesters
          </li>
          <li
            className={activeTab === "credentials" ? "active" : ""}
            onClick={() => setActiveTab("credentials")}
          >
            Credentials
          </li>
        </ul>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <h3>User Dashboard</h3>

        {loading && <Loader>Loading...</Loader>}
        {error && <ErrorModal>{error}</ErrorModal>}
        {success && <SuccessModal>{success}</SuccessModal>}

        {activeTab === "profile" && <UserProfile />}

        {activeTab === "semesters" && (
          <>
            <h4>Semesters</h4>
            {semesters.length > 0 ? (
              <SemesterTable>
                <thead>
                  <tr>
                    <th>Semester</th>
                    <th>Month & Year</th>
                    <th>Date of Publication</th>
                    <th>Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  {semesters.map((sem) => (
                    <tr key={sem._id}>
                      <td>{sem.semesterNumber}</td>
                      <td>{sem.monthYearOfExam}</td>
                      <td>
                        {new Date(sem.dateOfPublication).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td>
                        {sem.subjects.map((sub, i) => (
                          <div key={i}>
                            {sub.subjectTitle}: {sub.grade}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </SemesterTable>
            ) : (
              !loading && <EmptyState>No semesters found.</EmptyState>
            )}
          </>
        )}

        {activeTab === "credentials" && <UserCredential userId={getId()} mode="user" />}
      </MainContent>
    </DashboardContainer>
  );
}

export default UserDashboard;
