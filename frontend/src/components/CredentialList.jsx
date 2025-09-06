import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import {
  CredentialListContainer,
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
  LoadingText
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
      <Header>
        <HeaderTitle>Credentials</HeaderTitle>
        <HeaderSubtitle>Manage and verify academic credentials</HeaderSubtitle>
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
                        {v.verified === true && (
                          <StatusBadge className="valid">✅ Valid</StatusBadge>
                        )}
                        {v.verified === false && (
                          <StatusBadge className="invalid">❌ Invalid</StatusBadge>
                        )}
                        {v.error && (
                          <StatusBadge className="warning">⚠️ Error</StatusBadge>
                        )}
                        {!v.verified && !v.error && !v.loading && (
                          <StatusBadge className="pending">⏳ Pending</StatusBadge>
                        )}
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
    </CredentialListContainer>
  );
}

export default CredentialList;
