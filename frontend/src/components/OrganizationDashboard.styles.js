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
  background: #f7fafc;
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #2d3748 0%, #1a202c 100%);
  color: white;
  padding: 0;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
  
  @media (max-width: 768px) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100vh;
  }
`;

export const SidebarTitle = styled.h2`
  padding: 30px 24px 20px;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 20px 0;
  margin: 0;
`;

export const SidebarMenuItem = styled.li`
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
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  animation: ${fadeIn} 0.6s ease-out;
  
  h3 {
    color: #2d3748;
    margin: 0 0 24px 0;
    font-size: 24px;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export const UserTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-collapse: collapse;
  
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
  }
  
  tr:hover {
    background: #f7fafc;
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
  
  &.success-modal {
    border-left: 4px solid #48bb78;
  }
  
  h3 {
    color: #2d3748;
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 600;
  }
  
  p {
    color: #4a5568;
    margin: 0 0 20px 0;
    line-height: 1.5;
  }
`;

export const CloseButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
`;