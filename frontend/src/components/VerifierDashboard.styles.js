import styled, { keyframes } from "styled-components";

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

const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
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

export const DashboardContainer = styled.div`
  padding: 32px;
  background: #f8fafc;
  min-height: 100vh;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const CompanyCard = styled.div`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 32px;
  border-radius: 20px;
  margin-bottom: 32px;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
  animation: ${slideUp} 0.5s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    margin: 0 0 12px;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  p {
    margin: 8px 0;
    font-size: 16px;
    opacity: 0.9;
  }
`;

export const Timer = styled.div`
  margin-top: 20px;
  font-weight: 600;

  span {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 14px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .expired {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #fff;
    animation: ${pulse} 2s infinite;
  }
`;

export const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const StudentCard = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #f1f5f9;
  animation: ${slideUp} 0.4s ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    border-color: #e5e7eb;
  }

  h4 {
    margin: 0 0 12px;
    font-size: 18px;
    color: #1f2937;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  p {
    margin: 8px 0;
    font-size: 14px;
    color: #6b7280;
    
    &:first-of-type {
      color: #374151;
      font-weight: 500;
    }
  }
`;

export const BackButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  margin-bottom: 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const DetailCard = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  border: 1px solid #f1f5f9;
  animation: ${slideUp} 0.4s ease-out;

  h2 {
    margin-bottom: 20px;
    color: #1f2937;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  p {
    margin: 12px 0;
    font-size: 15px;
    color: #6b7280;
    line-height: 1.5;
  }

  strong {
    color: #374151;
    font-weight: 600;
  }
`;