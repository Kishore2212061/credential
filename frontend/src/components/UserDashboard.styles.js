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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  opacity: 0.05;
  z-index: -1;
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

export const SidebarHeader = styled.div`
  padding: 40px 32px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin: 0 auto 20px;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    animation: ${float} 3s ease-in-out infinite;
  }
`;

export const SidebarTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  background: #f8fafc;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const ContentHeader = styled.div`
  margin-bottom: 40px;
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
  margin-bottom: 40px;
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

export const SemesterGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SemesterCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
  }
  
  .semester-info {
    margin: 20px 0;
    padding: 16px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #3b82f6;
    
    p {
      margin: 8px 0;
      color: #374151;
      font-size: 14px;
      
      strong {
        color: #1f2937;
        font-weight: 600;
      }
    }
  }
`;

export const SemesterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SemesterNumber = styled.h3`
  color: #1f2937;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.025em;
`;

export const SemesterDate = styled.span`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  background: #f3f4f6;
  padding: 6px 12px;
  border-radius: 50px;
`;

export const SubjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    transform: translateX(4px);
  }
  
  .subject-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    strong {
      color: #1f2937;
      font-weight: 600;
      font-size: 15px;
    }
    
    .subject-code {
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  .subject-grade {
    .grade {
      padding: 8px 16px;
      border-radius: 50px;
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &.grade-a, &.grade-a+ {
        background: #d1fae5;
        color: #065f46;
      }
      
      &.grade-b, &.grade-b+ {
        background: #dbeafe;
        color: #1e40af;
      }
      
      &.grade-c, &.grade-c+ {
        background: #fef3c7;
        color: #92400e;
      }
      
      &.grade-d, &.grade-f {
        background: #fee2e2;
        color: #991b1b;
      }
    }
  }
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  color: #3b82f6;
  font-size: 18px;
  font-weight: 600;
  
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

export const ErrorModal = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #ef4444;
  z-index: 1000;
  max-width: 400px;
  
  div {
    display: flex;
    align-items: center;
    gap: 16px;
    
    span {
      font-size: 24px;
    }
    
    p {
      color: #374151;
      margin: 0;
      flex: 1;
      font-weight: 500;
    }
    
    button {
      background: #ef4444;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &:hover {
        background: #dc2626;
      }
    }
  }
`;

export const SuccessModal = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #10b981;
  z-index: 1000;
  max-width: 400px;
  
  div {
    display: flex;
    align-items: center;
    gap: 16px;
    
    span {
      font-size: 24px;
    }
    
    p {
      color: #374151;
      margin: 0;
      flex: 1;
      font-weight: 500;
    }
    
    button {
      background: #10b981;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &:hover {
        background: #059669;
      }
    }
  }
`;

export const EmptyState = styled(motion.div)`
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