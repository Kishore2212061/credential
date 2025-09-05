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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const IssueCredentialContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 600px;
  border: 1px solid #f1f5f9;
  
  h3 {
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

export const IssueForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Select = styled.select`
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: #f9fafb;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
  }
  
  option {
    padding: 12px;
    background: white;
    color: #374151;
  }
`;

export const Input = styled.input`
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: #f9fafb;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 24px;
  align-self: center;
  min-width: 200px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
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
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      animation: ${shimmer} 1.5s infinite;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const FormSection = styled.div`
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  
  h5 {
    color: #1f2937;
    margin: 0 0 20px 0;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: -0.025em;
    
    &::before {
      content: '📋';
      font-size: 20px;
    }
  }
`;

export const InfoCard = styled.div`
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 1px solid #93c5fd;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  
  p {
    margin: 0;
    color: #1e40af;
    font-size: 14px;
    line-height: 1.5;
    
    strong {
      color: #1e3a8a;
      font-weight: 600;
    }
  }
`;

export const StatusIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.processing {
    background: #fef3c7;
    color: #d97706;
    border: 1px solid #fbbf24;
  }
  
  &.success {
    background: #d1fae5;
    color: #059669;
    border: 1px solid #34d399;
  }
  
  &.error {
    background: #fee2e2;
    color: #dc2626;
    border: 1px solid #f87171;
  }
`;