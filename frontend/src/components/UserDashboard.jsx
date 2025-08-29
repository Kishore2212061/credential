import React, { useState, useEffect } from "react";
import { api, getId } from "../utils/api";
import UserProfile from "./UserProfile";
import UserCredential from "./UserCredentials";

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
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
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
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h3>User Dashboard</h3>

        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error-modal">{error}</div>}
        {success && <div className="success-modal">{success}</div>}

        {activeTab === "profile" && <UserProfile />}
        {activeTab === "semesters" && (
          <>
            <h4>Semesters</h4>
            {semesters.length > 0 ? (
              <table>
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
              </table>
            ) : (
              !loading && <p>No semesters found.</p>
            )}
          </>
        )}
        {activeTab === "credentials" && <UserCredential userId={getId()} />}
      </main>
    </div>
  );
}

export default UserDashboard;
