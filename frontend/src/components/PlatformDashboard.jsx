import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import AddOrganization from './AddOrganization';
import './Platform.css'

function PlatformDashboard() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await api.get('/platform/organizations');
        setOrganizations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrganizations();
  }, []);

  return (
    <div className="container">
      <h3>Platform Dashboard</h3>
      <AddOrganization onAdd={() => fetchOrganizations()} />
      <h4>Organizations</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map(org => (
            <tr key={org._id}>
              <td>{org.name}</td>
              <td>{org.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlatformDashboard;