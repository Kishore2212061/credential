import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function CredentialList({ setSuccess, setError }) {
  const [credentials, setCredentials] = useState([]);
  const [verifications, setVerifications] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCredentials = async () => {
      setLoading(true);
      try {
        const res = await api.get('/credential');
        setCredentials(res.data || []);
      } catch (err) {
        setError('Failed to fetch credentials');
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, [setError]);

  const handleVerify = async (credId) => {
    setVerifications((prev) => ({ ...prev, [credId]: { loading: true } }));
    try {
      const res = await api.get(`/credential/${credId}/verify`);
      setVerifications((prev) => ({
        ...prev,
        [credId]: { loading: false, ...res.data },
      }));
    } catch (err) {
      setVerifications((prev) => ({
        ...prev,
        [credId]: { loading: false, error: err.message },
      }));
    }
  };

  return (
    <div className="credential-list">
      <h3>Credentials</h3>
      <table>
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
  {cred.cid ? (
    <a
      href={`https://ipfs.io/ipfs/${cred.cid}`}
      target="_blank"
      rel="noopener noreferrer"
    >
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
                    {v.verified === true && <span className="valid">✅ Valid</span>}
                    {v.verified === false && <span className="invalid">❌ Invalid</span>}
                    {v.error && <span className="warning">⚠️ {v.error}</span>}
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

export default CredentialList;
