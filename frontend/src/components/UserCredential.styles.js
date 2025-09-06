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

const slideUp = keyframes`
  from {
    transform: translateY(100%);
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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const CredContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid #f1f5f9;
  
  h4 {
    color: #1f2937;
    margin: 0 0 32px 0;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    position: relative;
    letter-spacing: -0.025em;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    margin: 0 16px;
  }
`;

export const CredTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
    vertical-align: middle;
    font-size: 15px;
  }
  
  tr {
    transition: all 0.2s ease;
    
    &:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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

export const VerifyBtn = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
    transform: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: ${shimmer} 1.5s infinite;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 8px;
  animation: ${pulse} 2s infinite;
  
  &.valid {
    background: #d1fae5;
    color: #059669;
    border: 1px solid #34d399;
  }
  
  &.invalid {
    background: #fee2e2;
    color: #dc2626;
    border: 1px solid #f87171;
  }
  
  &.warning {
    background: #fef3c7;
    color: #d97706;
    border: 1px solid #fbbf24;
  }
`;

export const PDFLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 50px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #dbeafe;
    color: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  
  &::before {
    content: '📄';
    font-size: 14px;
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
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 0.4s ease-out;
  border: 1px solid #e5e7eb;
  
  &.success {
    border-left: 4px solid #10b981;
  }
  
  &.error {
    border-left: 4px solid #ef4444;
  }
  
  p {
    color: #6b7280;
    margin: 0 0 24px 0;
    line-height: 1.6;
    font-size: 16px;
    text-align: center;
  }
  
  button {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    margin-top: 24px;
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
  }
`;

export const ChainDetails = styled.div`
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  text-align: left;
  
  h4 {
    color: #1f2937;
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: -0.025em;
    
    &::before {
      content: '🔗';
      font-size: 20px;
    }
  }
  
  p {
    margin: 12px 0;
    font-size: 14px;
    line-height: 1.5;
    color: #6b7280;
    text-align: left;
    
    strong {
      color: #374151;
      font-weight: 600;
    }
    
    a {
      color: #3b82f6;
      text-decoration: none;
      word-break: break-all;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const EmptyCredentials = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: #6b7280;
  
  &::before {
    content: '🎓';
    font-size: 64px;
    display: block;
    margin-bottom: 24px;
    opacity: 0.5;
  }
  
  p {
    margin: 0;
    font-size: 16px;
    font-style: italic;
  }
`;

export const VerificationStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;