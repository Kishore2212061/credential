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

export const OrganizationDashboard = styled.div`
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
  
  @media (max-width: 768px) {
    width: 100%;
    position: fixed;
    top: 72px;
    left: 0;
    z-index: 100;
    height: calc(100vh - 72px);
  }
`;

export const SidebarTitle = styled.h2`
  padding: 32px 24px 24px;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  letter-spacing: -0.025em;
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 24px 0;
  margin: 0;
`;

export const SidebarMenuItem = styled.li`
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
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const UserTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
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
    font-size: 15px;
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
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
  border: 1px solid #e5e7eb;
  
  &.success-modal {
    border-left: 4px solid #10b981;
  }
  
  h3 {
    color: #1f2937;
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.025em;
  }
  
  p {
    color: #6b7280;
    margin: 0 0 24px 0;
    line-height: 1.6;
    font-size: 15px;
  }
`;

export const CloseButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;