import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function CredentialList({ userId }) {
  const [credentials, setCredentials] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: userId || '', semesterNumber: '', templateId: '' });
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');
  const [verifications, setVerifications] = useState({}); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const credRes = await api.get('/credential');
        setCredentials(credRes.data || []);

        if (!userId) {
          const userRes = await api.get('/organization/users');
          setUsers(userRes.data || []);
        }

        // Fetch templates
        const templateRes = await api.get('/template');
        setTemplates(templateRes.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      await api.post('/credential/issue', {
        ...form,
        userId: userId || form.userId,
      });

      // Refresh credentials
      const res = await api.get('/credential');
      setCredentials(res.data || []);

      // Reset form
      setForm({ userId: userId || '', semesterNumber: '', templateId: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue credential');
    }
  };

    const handleVerify = async (credId) => {
      try {
        setVerifications((prev) => ({ ...prev, [credId]: { loading: true } }));
  
        const res = await api.get(`/credential/${credId}/verify`);
  
        setVerifications((prev) => ({
          ...prev,
          [credId]: { loading: false, ...res.data },
        }));
      } catch (err) {
        console.error('Verification failed:', err);
        setVerifications((prev) => ({
          ...prev,
          [credId]: { loading: false, error: err.message },
        }));
      }
    };
  

  return (
    <div>
      {/* Show form only if userId is NOT passed */}
      {!userId && (
        <>
          <h4>Issue Credential</h4>
          <form onSubmit={handleIssue}>
            <select name="userId" value={form.userId} onChange={handleChange} required>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.email}</option>
              ))}
            </select>
            <input
              type="number"
              name="semesterNumber"
              placeholder="Semester Number"
              value={form.semesterNumber}
              onChange={handleChange}
              required
            />
            <select name="templateId" value={form.templateId} onChange={handleChange} required>
              <option value="">Select Template</option>
              {templates.map(template => (
                <option key={template._id} value={template._id}>{template.name}</option>
              ))}
            </select>
            <button type="submit">Issue Credential</button>
            {error && <p className="error">{error}</p>}
          </form>
        </>
      )}

      <div>
      <h4>Credentials</h4>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Semester</th>
            <th>Template</th>
            <th>PDF</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {credentials.length > 0 ? (
            credentials.map((cred) => {
              const v = verifications[cred._id] || {};
              return (
                <tr key={cred._id}>
                  <td>{cred.user?.userDetail?.name || 'N/A'}</td>
                  <td>{cred.semester?.semesterNumber || 'N/A'}</td>
                  <td>{cred.template?.name || 'N/A'}</td>
                  <td>
                    {cred.pdfPath ? (
                      <a href={cred.pdfPath} target="_blank" rel="noopener noreferrer">
                        View PDF
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleVerify(cred._id)} disabled={v.loading}>
                      {v.loading ? 'Verifying...' : 'Verify'}
                    </button>
                    {v.verified === true && (
                      <span style={{ color: 'green', marginLeft: '8px' }}>✅ Valid</span>
                    )}
                    {v.verified === false && (
                      <span style={{ color: 'red', marginLeft: '8px' }}>❌ Invalid</span>
                    )}
                    {v.error && (
                      <span style={{ color: 'orange', marginLeft: '8px' }}>
                        ⚠️ {v.error}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No credentials found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default CredentialList;
