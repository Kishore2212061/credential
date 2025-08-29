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
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
  
  h4 {
    color: #2d3748;
    margin: 0 0 30px 0;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 10px;
  }
`;

export const CredTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
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
    vertical-align: middle;
  }
  
  tr {
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    
    th, td {
      padding: 12px 8px;
    }
  }
`;

export const VerifyBtn = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
    
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
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
  }
`;

export const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 8px;
  animation: ${pulse} 2s infinite;
  
  &.valid {
    background: #c6f6d5;
    color: #276749;
    border: 1px solid #9ae6b4;
  }
  
  &.invalid {
    background: #fed7d7;
    color: #c53030;
    border: 1px solid #feb2b2;
  }
  
  &.warning {
    background: #fef5e7;
    color: #d69e2e;
    border: 1px solid #f6e05e;
  }
`;

export const PDFLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: #ebf8ff;
    color: #5a67d8;
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 0.4s ease-out;
  
  &.success {
    border-left: 4px solid #48bb78;
  }
  
  &.error {
    border-left: 4px solid #e53e3e;
  }
  
  p {
    color: #4a5568;
    margin: 0 0 20px 0;
    line-height: 1.6;
    font-size: 16px;
    text-align: center;
  }
  
  button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    margin-top: 20px;
    
    &:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
    }
  }
`;

export const ChainDetails = styled.div`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
  
  h4 {
    color: #2d3748;
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '🔗';
      font-size: 20px;
    }
  }
  
  p {
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.5;
    color: #4a5568;
    
    strong {
      color: #2d3748;
      font-weight: 600;
    }
    
    a {
      color: #667eea;
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
  padding: 60px 20px;
  color: #718096;
  
  &::before {
    content: '🎓';
    font-size: 48px;
    display: block;
    margin-bottom: 16px;
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