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

export const VerifierContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
    margin: 0 16px;
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const FormTitle = styled.h4`
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

export const FormSubtitle = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

export const VerifierForm = styled.form`
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
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  color: #374151;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #9ca3af;
  z-index: 1;
  transition: color 0.3s ease;
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px 20px 20px 60px;
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
    
    + ${InputIcon} {
      color: #3b82f6;
    }
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

export const Select = styled.select`
  width: 100%;
  padding: 20px 20px 20px 60px;
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
    
    + ${InputIcon} {
      color: #3b82f6;
    }
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

export const StudentSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 32px;
  border: 2px solid #e2e8f0;
  margin: 24px 0;
  position: relative;
  z-index: 1;
`;

export const StudentHeader = styled.div`
  margin-bottom: 24px;
`;

export const StudentTitle = styled.h5`
  color: #1e293b;
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

export const StudentSubtitle = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #9ca3af;
  z-index: 1;
  transition: color 0.3s ease;
`;

export const StudentList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background: rgba(248, 250, 252, 0.8);
  margin-top: 16px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const StudentItem = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.05);
  }
`;

export const StudentCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:checked {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    border-color: #3b82f6;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }
`;

export const StudentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StudentName = styled.div`
  color: #1e293b;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentRegister = styled.div`
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentEmpty = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 16px;
  font-weight: 500;
`;

export const SelectedStudents = styled.div`
  margin-top: 24px;
  padding: 20px;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 16px;
  border: 2px solid rgba(16, 185, 129, 0.1);
`;

export const SelectedCount = styled.h6`
  color: #059669;
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const SelectedStudent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  }
`;

export const RemoveStudent = styled.button`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 200px;
  
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
    box-shadow: 0 16px 32px rgba(59, 130, 246, 0.4);
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    
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
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 10;
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

export const LoadingText = styled.p`
  color: #374151;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
`;

export const Modal = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  animation: ${fadeIn} 0.4s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
`;

export const ModalIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const SuccessIcon = styled.div`
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #059669;
  font-size: 32px;
`;

export const ErrorIcon = styled.div`
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #dc2626;
  font-size: 32px;
`;

export const ModalTitle = styled.h3`
  color: #1f2937;
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.025em;
`;

export const ModalContent = styled.div`
  color: #6b7280;
  margin: 0 0 32px 0;
  line-height: 1.6;
  font-size: 16px;
  
  p {
    margin: 0;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
`;

export const CloseButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  }
`;
