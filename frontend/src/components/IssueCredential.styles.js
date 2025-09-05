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
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 600px;
  
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
  color: #4a5568;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Select = styled.select`
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f7fafc;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: #cbd5e0;
  }
  
  option {
    padding: 10px;
    background: white;
    color: #4a5568;
  }
`;

export const Input = styled.input`
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f7fafc;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: #cbd5e0;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  align-self: center;
  min-width: 200px;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.3);
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
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      animation: ${shimmer} 1.5s infinite;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
`;

export const FormSection = styled.div`
  padding: 20px;
  background: #f7fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  
  h5 {
    color: #2d3748;
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '📋';
      font-size: 18px;
    }
  }
`;

export const InfoCard = styled.div`
  background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
  border: 1px solid #90cdf4;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
  
  p {
    margin: 0;
    color: #2c5282;
    font-size: 14px;
    line-height: 1.5;
    
    strong {
      color: #1a365d;
    }
  }
`;

export const StatusIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.processing {
    background: #fef5e7;
    color: #d69e2e;
    border: 1px solid #f6e05e;
  }
  
  &.success {
    background: #c6f6d5;
    color: #276749;
    border: 1px solid #9ae6b4;
  }
  
  &.error {
    background: #fed7d7;
    color: #c53030;
    border: 1px solid #feb2b2;
  }
`;