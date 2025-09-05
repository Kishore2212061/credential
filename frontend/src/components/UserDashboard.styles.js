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
  background: #f8fafc;
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
  
  h2 {
    padding: 32px 24px 24px;
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    letter-spacing: -0.025em;
  }
  
  ul {
    list-style: none;
    padding: 24px 0;
    margin: 0;
  }
  
  li {
    padding: 16px 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-left: 4px solid transparent;
    font-weight: 500;
    font-size: 15px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-left-color: #3b82f6;
      transform: translateX(2px);
    }
    
    &.active {
      background: rgba(59, 130, 246, 0.15);
      border-left-color: #3b82f6;
      color: #93c5fd;
      font-weight: 600;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    position: fixed;
    top: 72px;
    left: 0;
    z-index: 100;
    height: calc(100vh - 72px);
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 32px;
  animation: ${fadeIn} 0.6s ease-out;
  
  h3 {
    color: #1f2937;
    margin: 0 0 32px 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.025em;
  }
  
  h4 {
    color: #374151;
    margin: 0 0 24px 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.025em;
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #3b82f6;
  font-size: 16px;
  font-weight: 500;
  
  &::before {
    content: '';
    width: 24px;
    height: 24px;
    border: 2px solid #f1f5f9;
    border-top: 2px solid #3b82f6;
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
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-left: 4px solid #ef4444;
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
  color: #dc2626;
  font-weight: 500;
  animation: ${fadeIn} 0.4s ease-out;
  font-size: 15px;
`;

export const SuccessModal = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-left: 4px solid #10b981;
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
  color: #059669;
  font-weight: 500;
  animation: ${fadeIn} 0.4s ease-out;
  font-size: 15px;
`;

export const SemesterTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
  margin-top: 24px;
  border: 1px solid #f1f5f9;
  
  th {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    padding: 20px 24px;
    text-align: left;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: none;
  }
  
  td {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
    color: #374151;
    vertical-align: top;
    font-size: 15px;
    
    div {
      margin-bottom: 8px;
      font-size: 14px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  tr {
    transition: all 0.2s ease;
    
    &:hover {
      background: #f8fafc;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    
    th, td {
      padding: 16px 12px;
    }
  }
`;

export const EmptyState = styled.p`
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 48px 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-top: 24px;
  font-size: 16px;
  border: 1px solid #f1f5f9;
  
  &::before {
    content: '📋';
    font-size: 48px;
    display: block;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;