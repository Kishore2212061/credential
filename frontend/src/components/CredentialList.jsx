import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import {
  CredentialListContainer,
  CredentialTable,
  VerifyButton,
  StatusBadge,
  PDFLink,
  EmptyState,
  LoadingRow,
} from './CredentialList.styles';

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
    <CredentialListContainer>
      <h3>Credentials</h3>

      <CredentialTable>
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
          {loading ? (
            <LoadingRow>
              <td colSpan="5">Loading credentials...</td>
            </LoadingRow>
          ) : credentials.length > 0 ? (
            credentials.map((cred) => {
              const v = verifications[cred._id] || {};
              return (
                <tr key={cred._id}>
                  <td>{cred.user?.userDetail?.name || 'N/A'}</td>
                  <td>{cred.semester?.semesterNumber || 'N/A'}</td>
                  <td>{cred.template?.name || 'N/A'}</td>
                  <td>
                    {cred.cid ? (
                      <PDFLink
                        href={cred.cid}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </PDFLink>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <VerifyButton
                      onClick={() => handleVerify(cred._id)}
                      disabled={v.loading}
                    >
                      {v.loading ? 'Verifying...' : 'Verify'}
                    </VerifyButton>
                    {v.verified === true && (
                      <StatusBadge className="valid">✅ Valid</StatusBadge>
                    )}
                    {v.verified === false && (
                      <StatusBadge className="invalid">❌ Invalid</StatusBadge>
                    )}
                    {v.error && (
                      <StatusBadge className="warning">⚠️ {v.error}</StatusBadge>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">
                <EmptyState>
                  <p>No credentials found</p>
                </EmptyState>
              </td>
            </tr>
          )}
        </tbody>
      </CredentialTable>
    </CredentialListContainer>
  );
}

export default CredentialList;
