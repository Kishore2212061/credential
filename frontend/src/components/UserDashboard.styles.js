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
    transform: translateX(-100%);
  }
  to {
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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
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

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

export const Sidebar = styled.aside`
  width: 320px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
    pointer-events: none;
  }
  
  h2 {
    padding: 40px 32px 32px;
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    letter-spacing: -0.025em;
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100vh;
  }
`;

export const TabNavigation = styled.div`
  padding: 32px 0;
  position: relative;
  z-index: 1;
`;

export const TabButton = styled.button`
  width: 100%;
  padding: 20px 32px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-left-color: #3b82f6;
    transform: translateX(4px);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.active {
    background: rgba(59, 130, 246, 0.15);
    border-left-color: #3b82f6;
    color: #93c5fd;
    font-weight: 700;
    
    &::before {
      opacity: 1;
    }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const Header = styled.div`
  margin-bottom: 40px;
`;

export const HeaderTitle = styled.h1`
  color: #1e293b;
  margin: 0 0 12px 0;
  font-size: 36px;
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

export const TabContent = styled.div`
  animation: ${fadeIn} 0.4s ease-out;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px;
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
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 16px 48px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.3);
  }
`;

export const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  animation: ${float} 3s ease-in-out infinite;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
`;

export const ContentSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const SectionTitle = styled.h2`
  color: #1e293b;
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

export const SectionSubtitle = styled.p`
  color: #64748b;
  margin: 0 0 32px 0;
  font-size: 16px;
  font-weight: 500;
`;

export const SemesterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`;

export const SemesterCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px;
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

export const SemesterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f5f9;
  position: relative;
  z-index: 1;
`;

export const SemesterNumber = styled.h3`
  color: #1e293b;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

export const SemesterDate = styled.span`
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  background: rgba(59, 130, 246, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
`;

export const SemesterSubjects = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

export const SubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(59, 130, 246, 0.05);
    border-color: #3b82f6;
    transform: translateX(4px);
  }
`;

export const SubjectTitle = styled.span`
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  flex: 1;
`;

export const SubjectGrade = styled.span`
  font-weight: 800;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 8px;
  min-width: 40px;
  text-align: center;
  
  ${props => {
    switch (props.grade) {
      case 'A':
        return `
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        `;
      case 'B':
        return `
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        `;
      case 'C':
        return `
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
        `;
      default:
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        `;
    }
  }}
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  color: #3b82f6;
  font-size: 18px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  
  &::before {
    content: '';
    width: 32px;
    height: 32px;
    border: 3px solid #f1f5f9;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 16px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorModal = styled.div`
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 2px solid #fecaca;
  border-left: 4px solid #ef4444;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  color: #dc2626;
  font-weight: 600;
  animation: ${fadeIn} 0.4s ease-out;
  font-size: 16px;
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.1);
`;

export const SuccessModal = styled.div`
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 2px solid #bbf7d0;
  border-left: 4px solid #10b981;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  color: #059669;
  font-weight: 600;
  animation: ${fadeIn} 0.4s ease-out;
  font-size: 16px;
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.1);
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