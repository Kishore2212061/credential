import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function UserCredential({ userId }) {
  const [credentials, setCredentials] = useState([]);
  const [verifications, setVerifications] = useState({}); // store verification results

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const credRes = await api.get(`/credential/${userId}`);
        setCredentials(credRes.data || []);
      } catch (err) {
        console.error('Failed to fetch credentials:', err);
      }
    };
    fetchData();
  }, [userId]);

  // call backend verify API
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
                      <span className="status valid"> Valid</span>
                    )}
                    {v.verified === false && (
                      <span className="status invalid">Invalid</span>
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
  );
}

export default UserCredential;
