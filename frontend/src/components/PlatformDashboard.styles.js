import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
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

export const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
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
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.1), transparent);
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

export const SidebarTitle = styled.h2`
  padding: 40px 32px 32px;
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  letter-spacing: -0.025em;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 32px;
    right: 32px;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
    border-radius: 1px;
  }
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 32px 0;
  margin: 0;
`;

export const SidebarMenuItem = styled(motion.li)`
  padding: 20px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  
  span {
    font-size: 20px;
    width: 24px;
    text-align: center;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    transition: width 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-left-color: #3b82f6;
    
    &::before {
      width: 4px;
    }
  }
  
  &.active {
    background: rgba(59, 130, 246, 0.15);
    border-left-color: #3b82f6;
    color: #93c5fd;
    
    &::before {
      width: 4px;
    }
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const HeaderTitle = styled.h1`
  color: #1f2937;
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 8px 0;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeaderSubtitle = styled.p`
  color: #6b7280;
  font-size: 18px;
  margin: 0;
  font-weight: 500;
`;

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const StatCard = styled(motion.div)`
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

export const StatIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 8px;
  letter-spacing: -0.025em;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SearchInput = styled(motion.input)`
  width: 100%;
  max-width: 500px;
  padding: 20px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: #9ca3af;
    font-weight: 500;
  }
`;

export const OrgTable = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 16px;
  }
`;

export const TableCell = styled.div`
  padding: 24px;
  color: #374151;
  vertical-align: middle;
  font-size: 15px;
  display: flex;
  align-items: center;
  
  &:last-child {
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    strong {
      font-weight: 600;
      color: #1f2937;
    }
    
    small {
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    justify-content: center;
    text-align: center;
  }
`;

export const ActionButton = styled(motion.button)`
  padding: 10px 16px;
  border: none;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &.edit {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
    
    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  }
  
  &.delete {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
    
    &:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const FloatingActionButton = styled(motion.button)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
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
  width: 60px;
  height: 60px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ModalOverlay = styled(motion.div)`
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
  padding: 20px;
`;

export const Modal = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  
  h3 {
    color: #1f2937;
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  p {
    color: #6b7280;
    margin: 0 0 24px 0;
    line-height: 1.6;
    font-size: 15px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const CloseButton = styled.button`
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
    transform: translateY(-1px);
  }
`;

export const CancelButton = styled.button`
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
    transform: translateY(-1px);
  }
`;

export const DeleteConfirmButton = styled.button`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }
`;

export const EmptyState = styled(motion.div)`
  grid-column: 1 / -1;
  padding: 80px 40px;
  text-align: center;
  color: #6b7280;
  
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  span {
    font-size: 64px;
    opacity: 0.5;
    filter: grayscale(100%);
  }
  
  h3 {
    color: #374151;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
  
  p {
    color: #9ca3af;
    font-size: 16px;
    margin: 0;
  }
`;