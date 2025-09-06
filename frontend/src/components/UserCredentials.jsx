import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import {
  CredentialsContainer,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  ContentSection,
  SectionTitle,
  CredentialGrid,
  CredentialCard,
  CredentialHeader,
  CredentialUser,
  UserAvatar,
  UserInfo,
  UserName,
  UserEmail,
  CredentialDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  CredentialActions,
  VerifyButton,
  StatusBadge,
  PDFLink,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
  LoadingOverlay,
  Spinner,
  LoadingText,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalIcon,
  ModalContent,
  ModalActions,
  CloseButton,
  SuccessIcon,
  ErrorIcon,
  ChainDetails,
  ChainDetailsTitle,
  ChainDetailItem,
  ChainDetailLabel,
  ChainDetailValue,
  ChainLink
} from './UserCredentials.styles';

function UserCredential({ userId, mode = "user" }) {
  const [credentials, setCredentials] = useState([]);
  const [verifications, setVerifications] = useState({});
  const [modal, setModal] = useState({ type: '', message: '', open: false, cred: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      setLoading(true);
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
      } finally {
        setLoading(false);
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
    <CredentialsContainer>
      <Header>
        <HeaderTitle>Credentials</HeaderTitle>
        <HeaderSubtitle>View and verify academic credentials</HeaderSubtitle>
      </Header>

      <ContentSection>
        <SectionTitle>All Credentials ({credentials.length})</SectionTitle>

        {loading ? (
          <LoadingOverlay>
            <Spinner />
            <LoadingText>Loading credentials...</LoadingText>
          </LoadingOverlay>
        ) : credentials.length > 0 ? (
          <CredentialGrid>
            {credentials.map((cred) => {
              const v = verifications[cred._id] || {};
              return (
                <CredentialCard key={cred._id}>
                  <CredentialHeader>
                    <CredentialUser>
                      <UserAvatar>
                        {(cred.user?.userDetail?.name || cred.user?.email || 'U').charAt(0).toUpperCase()}
                      </UserAvatar>
                      <UserInfo>
                        <UserName>{cred.user?.userDetail?.name || 'Unknown User'}</UserName>
                        <UserEmail>{cred.user?.email || 'N/A'}</UserEmail>
                      </UserInfo>
                    </CredentialUser>
                  </CredentialHeader>

                  <CredentialDetails>
                    <DetailItem>
                      <DetailLabel>Semester</DetailLabel>
                      <DetailValue>{cred.semester?.semesterNumber || 'N/A'}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Template</DetailLabel>
                      <DetailValue>{cred.template?.name || 'N/A'}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Status</DetailLabel>
                      <DetailValue>
                        {v.verified === true && <StatusBadge className="valid">✅ Valid</StatusBadge>}
                        {v.verified === false && <StatusBadge className="invalid">❌ Invalid</StatusBadge>}
                        {v.error && <StatusBadge className="warning">⚠️ Error</StatusBadge>}
                        {!v.verified && !v.error && !v.loading && <StatusBadge className="pending">⏳ Pending</StatusBadge>}
                      </DetailValue>
                    </DetailItem>
                  </CredentialDetails>

                  <CredentialActions>
                    {cred.cid && (
                      <PDFLink
                        href={cred.cid}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄 View PDF
                      </PDFLink>
                    )}
                    <VerifyButton
                      onClick={() => handleVerify(cred._id)}
                      disabled={v.loading}
                    >
                      {v.loading ? 'Verifying...' : 'Verify'}
                    </VerifyButton>
                  </CredentialActions>
                </CredentialCard>
              );
            })}
          </CredentialGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>📜</EmptyIcon>
            <EmptyTitle>No Credentials Found</EmptyTitle>
            <EmptySubtitle>No credentials have been issued yet.</EmptySubtitle>
          </EmptyState>
        )}
      </ContentSection>

      {/* Modal */}
      {modal.open && modal.cred && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <ModalIcon>
                {modal.type === 'success' ? (
                  <SuccessIcon>✅</SuccessIcon>
                ) : (
                  <ErrorIcon>⚠️</ErrorIcon>
                )}
              </ModalIcon>
              <ModalTitle>
                {modal.type === 'success' ? 'Verification Successful' : 'Verification Failed'}
              </ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>{modal.message}</p>

              <ChainDetails>
                <ChainDetailsTitle>On-Chain Details</ChainDetailsTitle>
                <ChainDetailItem>
                  <ChainDetailLabel>Series ID</ChainDetailLabel>
                  <ChainDetailValue>{modal.cred.seriesId}</ChainDetailValue>
                </ChainDetailItem>
                <ChainDetailItem>
                  <ChainDetailLabel>Version</ChainDetailLabel>
                  <ChainDetailValue>{modal.cred.version}</ChainDetailValue>
                </ChainDetailItem>
                <ChainDetailItem>
                  <ChainDetailLabel>Content Hash</ChainDetailLabel>
                  <ChainDetailValue>{modal.cred.onChain?.contentHash}</ChainDetailValue>
                </ChainDetailItem>
                <ChainDetailItem>
                  <ChainDetailLabel>CID</ChainDetailLabel>
                  <ChainDetailValue>
                    <ChainLink
                      href={modal.cred.onChain?.cid}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {modal.cred.onChain?.cid}
                    </ChainLink>
                  </ChainDetailValue>
                </ChainDetailItem>
                <ChainDetailItem>
                  <ChainDetailLabel>Issuer</ChainDetailLabel>
                  <ChainDetailValue>{modal.cred.onChain?.issuer}</ChainDetailValue>
                </ChainDetailItem>
                <ChainDetailItem>
                  <ChainDetailLabel>Subject Wallet</ChainDetailLabel>
                  <ChainDetailValue>{modal.cred.onChain?.subject}</ChainDetailValue>
                </ChainDetailItem>
                <ChainDetailItem>
                  <ChainDetailLabel>Revoked</ChainDetailLabel>
                  <ChainDetailValue>
                    {modal.cred.onChain?.revoked ? "Yes ❌" : "No ✅"}
                  </ChainDetailValue>
                </ChainDetailItem>
                <ChainDetailItem>
                  <ChainDetailLabel>Issued At</ChainDetailLabel>
                  <ChainDetailValue>
                    {new Date(modal.cred.onChain?.issuedAt * 1000).toLocaleString()}
                  </ChainDetailValue>
                </ChainDetailItem>
              </ChainDetails>
            </ModalContent>
            <ModalActions>
              <CloseButton onClick={() => setModal({ ...modal, open: false })}>
                Close
              </CloseButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </CredentialsContainer>
  );
}

export default UserCredential;
