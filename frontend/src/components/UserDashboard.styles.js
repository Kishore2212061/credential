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

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f7fafc;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background: linear-gradient(180deg, #2d3748 0%, #1a202c 100%);
  color: white;
  padding: 0;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
  
  h2 {
    padding: 30px 24px 20px;
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
  }
  
  ul {
    list-style: none;
    padding: 20px 0;
    margin: 0;
  }
  
  li {
    padding: 16px 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
    font-weight: 500;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-left-color: #667eea;
    }
    
    &.active {
      background: rgba(102, 126, 234, 0.2);
      border-left-color: #667eea;
      color: #90cdf4;
    }
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

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  animation: ${fadeIn} 0.6s ease-out;
  
  h3 {
    color: #2d3748;
    margin: 0 0 24px 0;
    font-size: 28px;
    font-weight: 700;
  }
  
  h4 {
    color: #4a5568;
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #667eea;
  font-size: 18px;
  font-weight: 500;
  
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #e2e8f0;
    border-top: 2px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 12px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorModal = styled.div`
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 16px;
  margin: 20px 0;
  color: #c53030;
  font-weight: 500;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const SuccessModal = styled.div`
  background: #c6f6d5;
  border: 1px solid #9ae6b4;
  border-radius: 8px;
  padding: 16px;
  margin: 20px 0;
  color: #276749;
  font-weight: 500;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const SemesterTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-collapse: collapse;
  margin-top: 20px;
  
  th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  td {
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
    color: #4a5568;
    vertical-align: top;
    
    div {
      margin-bottom: 4px;
      font-size: 14px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  tr:hover {
    background: #f7fafc;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    
    th, td {
      padding: 12px 8px;
    }
  }
`;

export const EmptyState = styled.p`
  text-align: center;
  color: #718096;
  font-style: italic;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;