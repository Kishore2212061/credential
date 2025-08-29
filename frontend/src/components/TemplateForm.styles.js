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
    transform: scale(1.02);
  }
`;

export const TemplateFormContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 900px;
  
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

export const TemplateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
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

export const TextArea = styled.textarea`
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  transition: all 0.3s ease;
  background: #f7fafc;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:hover {
    border-color: #cbd5e0;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

export const CodeSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const CodeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    color: #4a5568;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '{}';
      font-family: monospace;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
    }
  }
`;

export const CodeTextArea = styled.textarea`
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  transition: all 0.3s ease;
  background: #1a202c;
  color: #e2e8f0;
  resize: vertical;
  min-height: 200px;
  line-height: 1.5;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:hover {
    border-color: #cbd5e0;
  }
  
  &::placeholder {
    color: #718096;
  }
`;

export const SubmitButton = styled.button`
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(72, 187, 120, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.3);
  }
`;

export const TemplateModalOverlay = styled.div`
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

export const TemplateModal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
  
  &.loading {
    border-left: 4px solid #667eea;
  }
  
  &.error {
    border-left: 4px solid #e53e3e;
  }
  
  &.success {
    border-left: 4px solid #48bb78;
  }
  
  p {
    color: #4a5568;
    margin: 0 0 24px 0;
    line-height: 1.6;
    font-size: 16px;
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
    min-width: 100px;
    
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

export const TemplateLoader = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const PreviewSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 12px;
  border: 2px dashed #cbd5e0;
  
  h5 {
    color: #2d3748;
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
`;

export const PreviewFrame = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  min-height: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;
`;