import React, { useState, useEffect } from 'react';
import { api, getId } from '../utils/api';
import UserProfile from './UserProfile';
import UserCredential from './UserCredentials';

function UserDashboard() {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await api.get(`/semester/${getId()}`);
        setSemesters(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSemesters();
  }, []);

  return (
    <div className="container">
      <h3>User Dashboard</h3>
      <UserProfile />
      <h4>Semesters</h4>
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
          {semesters.map(sem => (
            <tr key={sem._id}>
              <td>{sem.semesterNumber}</td>
              <td>{sem.monthYearOfExam}</td>
              <td>{new Date(sem.dateOfPublication).toLocaleDateString('en-GB')}</td>
              <td>
                {sem.subjects.map((sub, i) => (
                  <div key={i}>{sub.subjectTitle}: {sub.grade}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserCredential userId={getId()} />
    </div>
  );
}

export default UserDashboard;