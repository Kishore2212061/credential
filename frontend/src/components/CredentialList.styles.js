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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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

export const CredentialListContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
  
  h3 {
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

export const CredentialTable = styled.table`
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
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    }
  }
  
  td {
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
    color: #4a5568;
    vertical-align: middle;
    
    &:last-child {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
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
    
    td:last-child {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
`;

export const VerifyButton = styled.button`
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
    position: relative;
    overflow: hidden;
    
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

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;
  
  &::before {
    content: '📋';
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

export const LoadingRow = styled.tr`
  td {
    padding: 20px;
    text-align: center;
    
    &::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid #e2e8f0;
      border-top: 2px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 10px;
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const CredentialCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  h4 {
    color: #2d3748;
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  p {
    margin: 0;
    color: #4a5568;
    font-size: 14px;
    
    strong {
      color: #2d3748;
    }
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
`;