import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function UserCredential({ userId }) {
  const [credentials, setCredentials] = useState([]);
  const [verifications, setVerifications] = useState({});
  const [modal, setModal] = useState({ type: '', message: '', open: false, cred: null });

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const credRes = await api.get(`/credential/${userId}`);
        setCredentials(credRes.data || []);
      } catch (err) {
        console.error('Failed to fetch credentials:', err);
        setModal({ type: 'error', message: 'Failed to load credentials', open: true });
      }
    };
    fetchData();
  }, [userId]);

  const handleVerify = async (credId) => {
    try {
      setVerifications((prev) => ({ ...prev, [credId]: { loading: true } }));

      const res = await api.get(`/credential/${credId}/verify`);

      setVerifications((prev) => ({
        ...prev,
        [credId]: { loading: false, ...res.data },
      }));

      if (res.data.verified) {
        setModal({ type: 'success', message: 'Credential is Valid ✅', open: true, cred: res.data });
      } else {
        setModal({ type: 'error', message: 'Credential is Invalid ❌', open: true, cred: res.data });
      }
    } catch (err) {
      console.error('Verification failed:', err);
      setVerifications((prev) => ({
        ...prev,
        [credId]: { loading: false, error: err.message },
      }));
      setModal({ type: 'error', message: 'Verification failed. Try again.', open: true });
    }
  };

  return (
    <div className="cred-container">
      <h4>Credentials</h4>
      <table className="cred-table">
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
                    <button
                      className="verify-btn"
                      onClick={() => handleVerify(cred._id)}
                      disabled={v.loading}
                    >
                      {v.loading ? 'Verifying...' : 'Verify'}
                    </button>
                    {v.verified === true && <span className="status valid">✔ Valid</span>}
                    {v.verified === false && <span className="status invalid">✖ Invalid</span>}
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

      {/* Modal */}
      {modal.open && modal.cred && (
        <div className="modal-overlay">
          <div className={`modal ${modal.type}`}>
            <p>{modal.message}</p>

            <div className="chain-details">
              <h4>On-Chain Details</h4>
              <p><strong>Series ID:</strong> {modal.cred.seriesId}</p>
              <p><strong>Version:</strong> {modal.cred.version}</p>
              <p><strong>Content Hash:</strong> {modal.cred.onChain?.contentHash}</p>
              <p>
                <strong>CID:</strong>{' '}
                <a
                  href={`https://ipfs.io/ipfs/${modal.cred.onChain?.cid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {modal.cred.onChain?.cid}
                </a>
              </p>
              <p><strong>Issuer:</strong> {modal.cred.onChain?.issuer}</p>
              <p><strong>Subject Wallet:</strong> {modal.cred.onChain?.subject}</p>
              <p><strong>Revoked:</strong> {modal.cred.onChain?.revoked ? "Yes ❌" : "No ✅"}</p>
              <p><strong>Issued At:</strong> {new Date(modal.cred.onChain?.issuedAt * 1000).toLocaleString()}</p>
            </div>

            <button onClick={() => setModal({ ...modal, open: false })}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCredential;
