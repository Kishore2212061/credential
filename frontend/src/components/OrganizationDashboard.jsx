import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import AddUser from './AddUser';
import SemesterForm from './SemesterForm';
import TemplateForm from './TemplateForm';
import IssueCredential from './IssueCredential';
import CredentialList from './CredentialList'

function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState('userList');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/organization/users');
      setUsers(res.data || []);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="organization-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Organization Dashboard</h2>
        <ul className="sidebar-menu">
          <li
            className={activeTab === 'addUser' ? 'active' : ''}
            onClick={() => setActiveTab('addUser')}
          >
            Add User
          </li>
          <li
            className={activeTab === 'userList' ? 'active' : ''}
            onClick={() => setActiveTab('userList')}
          >
            User List
          </li>
          <li
            className={activeTab === 'semesterForm' ? 'active' : ''}
            onClick={() => setActiveTab('semesterForm')}
          >
            Semester Form
          </li>
          <li
            className={activeTab === 'templateForm' ? 'active' : ''}
            onClick={() => setActiveTab('templateForm')}
          >
            Template Form
          </li>
          <li
            className={activeTab === 'issueCredential' ? 'active' : ''}
            onClick={() => setActiveTab('issueCredential')}
          >
            Issue Credential
          </li>
          <li
            className={activeTab === 'credentialList' ? 'active' : ''}
            onClick={() => setActiveTab('credentialList')}
          >
            Credential List
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'addUser' && <AddUser onAdd={fetchUsers} setSuccess={setSuccess} setError={setError} />}
        {activeTab === 'userList' && (
          <div>
            <h3>User List</h3>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="1" style={{ textAlign: 'center' }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'semesterForm' && <SemesterForm setSuccess={setSuccess} setError={setError} />}
        {activeTab === 'templateForm' && <TemplateForm setSuccess={setSuccess} setError={setError} />}
{activeTab === 'issueCredential' && <IssueCredential setSuccess={setSuccess} setError={setError} />}
{activeTab === 'credentialList' && <CredentialList setSuccess={setSuccess} setError={setError} />}

      </main>

      {/* Loader */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Error Modal */}
      {error && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={() => setError('')} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="modal-overlay">
          <div className="modal success-modal">
            <h3>Success</h3>
            <p>{success}</p>
            <button onClick={() => setSuccess('')} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationDashboard;
