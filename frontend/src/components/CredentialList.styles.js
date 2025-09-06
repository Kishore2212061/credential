import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const CredentialListContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    margin: 0 16px;
  }
`;

export const Header = styled.div`
  margin-bottom: 40px;
`;

export const HeaderTitle = styled.h3`
  color: #1e293b;
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeaderSubtitle = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

export const ContentSection = styled.div`
  background: rgba(248, 250, 252, 0.8);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(147, 51, 234, 0.02) 100%);
    pointer-events: none;
  }
`;

export const SectionTitle = styled.h2`
  color: #1e293b;
  margin: 0 0 32px 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 1;
`;

export const CredentialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  position: relative;
  z-index: 1;
`;

export const CredentialCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(147, 51, 234, 0.02) 100%);
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.3);
  }
`;

export const CredentialHeader = styled.div`
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

export const CredentialUser = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const UserAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h4`
  color: #1e293b;
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

export const UserEmail = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

export const CredentialDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const DetailLabel = styled.span`
  color: #64748b;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.span`
  color: #1e293b;
  font-weight: 700;
  font-size: 14px;
`;

export const CredentialActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const VerifyButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
    transform: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.valid {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    color: #059669;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }
  
  &.invalid {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #dc2626;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  }
  
  &.warning {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #d97706;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  }
  
  &.pending {
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    color: #5b21b6;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }
`;

export const PDFLink = styled.a`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  grid-column: 1 / -1;
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
  animation: ${float} 3s ease-in-out infinite;
`;

export const EmptyTitle = styled.h3`
  color: #1e293b;
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

export const EmptySubtitle = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

export const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  grid-column: 1 / -1;
`;

export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  color: #374151;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;