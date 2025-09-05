import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import {
  CredContainer,
  CredTable,
  VerifyBtn,
  Status,
  PDFLink,
  ModalOverlay,
  Modal,
  ChainDetails,
  EmptyCredentials,
  VerificationStatus,
} from './UserCredential.styles';

function UserCredential({ userId, mode = "user"}) {
  const [credentials, setCredentials] = useState([]);
  const [verifications, setVerifications] = useState({});
  const [modal, setModal] = useState({ type: '', message: '', open: false, cred: null });
  console.log(mode)

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
            try {
        let res;
        if (mode === "user") {
         res = await api.get(`/credential/${userId}`);
        } else {
          const token = localStorage.getItem("verifierToken");
          res = await api.get(`/verifier/students/${userId}/credentials?token=${token}`);
        }
        setCredentials(res.data || []);
      } catch (err) {
        console.error("Failed to fetch credentials:", err);
        setModal({ type: "error", message: "Failed to load credentials", open: true });
      }
    };
    fetchData();
  }, [userId]);

  const handleVerify = async (credId) => {
    try {
      setVerifications((prev) => ({ ...prev, [credId]: { loading: true } }));

      let res;
      if (mode === "user") {
        res = await api.get(`/credential/${credId}/verify`);
      } else {
        const token = localStorage.getItem("verifierToken");
        res = await api.get(`/verifier/students/${credId}/verify?token=${token}`);
      }



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
    <CredContainer>
      <h4>Credentials</h4>
      <CredTable>
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
                    <VerificationStatus>
                      <VerifyBtn
                        onClick={() => handleVerify(cred._id)}
                        disabled={v.loading}
                      >
                        {v.loading ? 'Verifying...' : 'Verify'}
                      </VerifyBtn>
                      {v.verified === true && <Status className="valid">✔ Valid</Status>}
                      {v.verified === false && <Status className="invalid">✖ Invalid</Status>}
                    </VerificationStatus>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">
                <EmptyCredentials>
                  <p>No credentials found</p>
                </EmptyCredentials>
              </td>
            </tr>
          )}
        </tbody>
      </CredTable>

      {/* Modal */}
      {modal.open && modal.cred && (
        <ModalOverlay>
          <Modal className={modal.type}>
            <p>{modal.message}</p>

            <ChainDetails>
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
            </ChainDetails>

            <button onClick={() => setModal({ ...modal, open: false })}>Close</button>
          </Modal>
        </ModalOverlay>
      )}
    </CredContainer>
  );
}

export default UserCredential;
