import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import AddUser from './AddUser';
import SemesterForm from './SemesterForm';
import TemplateForm from './TemplateForm';
import CredentialList from './CredentialList';

function OrganizationDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/organization/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h3>Organization Dashboard</h3>
      <AddUser onAdd={() => fetchUsers()} />
      <h4>Users</h4>
      <table>
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SemesterForm />
      <TemplateForm />
      <CredentialList />
    </div>
  );
}

export default OrganizationDashboard;