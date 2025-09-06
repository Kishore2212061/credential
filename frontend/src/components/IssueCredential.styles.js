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
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
  }
`;

export const IssueCredentialContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    margin: 0 16px;
  }
`;

export const WizardContainer = styled.div`
  width: 100%;
`;

export const WizardHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const WizardTitle = styled.h3`
  color: #1e293b;
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const WizardSubtitle = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

export const WizardSteps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const StepIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

`;

export const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  
  ${props => props.active ? `
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  ` : props.completed ? `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
  ` : `
    background: #f1f5f9;
    color: #9ca3af;
    border: 2px solid #e2e8f0;
  `}
`;

export const StepLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.active ? '#3b82f6' : props.completed ? '#10b981' : '#9ca3af'};
  text-align: center;
  white-space: nowrap;
`;

export const StepConnector = styled.div`
  width: 80px;
  height: 2px;
  background: ${props => props.active ? 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)' : '#e2e8f0'};
  margin: 0 16px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 2px;
    height: 40px;
    margin: 8px 0;
  }
`;

export const WizardContent = styled.div`
  animation: ${fadeIn} 0.4s ease-out;
`;

export const IssueForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormSection = styled.div`
  background: rgba(248, 250, 252, 0.8);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(147, 51, 234, 0.02) 100%);
    pointer-events: none;
  }
  
  h4 {
    color: #1e293b;
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.025em;
    position: relative;
    z-index: 1;
  }
  
  p {
    color: #64748b;
    margin: 0 0 24px 0;
    font-size: 16px;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

export const Label = styled.label`
  color: #374151;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Select = styled.select`
  padding: 20px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 
      0 0 0 4px rgba(59, 130, 246, 0.1),
      0 8px 16px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
    transform: translateY(-1px);
  }
  
  option {
    padding: 12px;
    background: white;
    color: #374151;
  }
`;

export const Input = styled.input`
  padding: 20px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 
      0 0 0 4px rgba(59, 130, 246, 0.1),
      0 8px 16px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

export const FormValidation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ValidationMessage = styled.span`
  color: #ef4444;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '⚠️';
    font-size: 16px;
  }
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  margin-top: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
  }
`;

export const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h5`
  color: #1e293b;
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 700;
`;

export const UserEmail = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

export const TemplateCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  margin-top: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
  }
`;

export const TemplateIcon = styled.div`
  font-size: 32px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
`;

export const TemplateInfo = styled.div`
  flex: 1;
`;

export const TemplateName = styled.h5`
  color: #1e293b;
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 700;
`;

export const TemplateDescription = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

export const SummaryCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const SummaryLabel = styled.span`
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
`;

export const SummaryValue = styled.span`
  color: #1e293b;
  font-weight: 700;
  font-size: 16px;
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  gap: 16px;
`;

export const BackButton = styled.button`
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #e5e7eb;
    transform: translateY(-2px);
  }
`;

export const NextButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  align-self: center;
  min-width: 200px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(16, 185, 129, 0.4);
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
    transform: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
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
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3);
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
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
  margin-bottom: 24px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const SuccessMessage = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;