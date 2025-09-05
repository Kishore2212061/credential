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

export const DashboardWrapper = styled.div`
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
  font-size: 20px;
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
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

export const OrgTable = styled.table`
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
    
    &:last-child {
      display: flex;
      gap: 8px;
    }
  }
  
  tr:hover {
    background: #f7fafc;
  }
  
  button {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:first-child {
      background: #48bb78;
      color: white;
      
      &:hover {
        background: #38a169;
        transform: translateY(-1px);
      }
    }
    
    &:last-child {
      background: #e53e3e;
      color: white;
      
      &:hover {
        background: #c53030;
        transform: translateY(-1px);
      }
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
    }
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
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.4s ease-out;
  
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

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const CloseButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #cbd5e0;
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
`;

export const CancelButton = styled.button`
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #cbd5e0;
    transform: translateY(-1px);
  }
`;

export const DeleteConfirmButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c53030;
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.3);
  }
`;