import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
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

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  padding: 24px;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  animation: ${float} 6s ease-in-out infinite;
`;

export const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  padding: 48px;
  width: 100%;
  max-width: 480px;
  animation: ${fadeIn} 1s ease-out 0.3s both;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 32px;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    margin: 16px;
    border-radius: 24px;
    max-width: calc(100vw - 32px);
  }
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
  position: relative;
`;

export const FormIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  animation: ${pulse} 3s infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

export const LoginTitle = styled.h2`
  color: #1e293b;
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 12px 0;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const LoginSubtitle = styled.p`
  color: #64748b;
  font-size: 18px;
  margin: 0;
  font-weight: 500;
  font-weight: 500;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Label = styled.label`
  color: #374151;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const RoleSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 8px;
`;

export const RoleOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  border: 2px solid ${props => props.selected ? '#3b82f6' : '#e5e7eb'};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : 'rgba(255, 255, 255, 0.8)'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.selected ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)' : 'transparent'};
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

export const RoleIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

export const RoleLabel = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const InputWrapper = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
  }
  
  &:focus-within::after {
    width: 100%;
  }
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 20px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 
      0 0 0 4px rgba(59, 130, 246, 0.1),
      0 8px 16px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
    transform: translateY(-1px);
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

export const LoginSelect = styled.select`
  width: 100%;
  padding: 20px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 
      0 0 0 4px rgba(59, 130, 246, 0.1),
      0 8px 16px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
    transform: translateY(-1px);
    transform: translateY(-1px);
  }
`;

export const LoginButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 20px 32px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  box-shadow: 
    0 8px 16px rgba(59, 130, 246, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
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
    box-shadow: 
      0 16px 32px rgba(59, 130, 246, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.2);
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
    box-shadow: 
      0 0 0 4px rgba(59, 130, 246, 0.3),
      0 8px 16px rgba(59, 130, 246, 0.3);
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
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const LoadingContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 48px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${glow} 2s infinite;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 24px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  color: #374151;
  margin: 0;
  font-weight: 600;
  font-size: 16px;
`;

export const ModalOverlay = styled(motion.div)`
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

export const ModalContent = styled.div`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 32px;
  word-break: break-all;
  font-size: 15px;
  
  p {
    margin: 0 0 16px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: #1f2937;
    font-weight: 700;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
`;

export const ModalIcon = styled.span`
  font-size: 32px;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  font-size: 32px;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h3`
  color: #1f2937;
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.025em;
`;

export const ModalText = styled.p`
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
  font-size: 16px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
`;

export const CloseButton = styled.button`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.3);
  }
`;

export const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const WalletAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  word-break: break-all;
  color: #374151;
`;

export const WalletKey = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 12px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  word-break: break-all;
  color: #dc2626;
`;

export const CopyButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: #1d4ed8;
    transform: scale(1.05);
  }
`;

export const SecurityWarning = styled.div`
  background: #fef3c7;
  border: 2px solid #fbbf24;
  border-radius: 12px;
  padding: 16px;
  color: #d97706;
  font-size: 14px;
  line-height: 1.5;
  
  strong {
    color: #b45309;
    font-weight: 700;
  }
`;