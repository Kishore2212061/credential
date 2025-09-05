import React, { useState } from "react";
import { api, setAuth } from "../utils/api";

// styled components
import {
  LoginContainer,
  LoginCard,
  LoginHeader,
  FormIcon,
  LoginTitle,
  LoginSubtitle,
  LoginForm,
  FormGroup,
  Label,
  InputWrapper,
  LoginInput,
  LoginSelect,
  LoginButton,
  LoadingOverlay,
  LoadingContainer,
  Spinner,
  LoadingText,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalContent,
  ModalIcon,
  ModalTitle,
  ModalText,
  ModalActions,
  CloseButton
} from "./Login.styles";

function Login({ onLogin }) {
  const [role, setRole] = useState("platform");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔑 new state for wallet info (first login case)
  const [walletInfo, setWalletInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { role, email, password });
      setAuth(res.data.token, res.data.role, res.data.id);
      console.log(JSON.stringify(res.data))

      if (res.data.privateKey) {
        // First login → wallet just created
        setWalletInfo({
          address: res.data.wallet,
          privateKey: res.data.privateKey,
        });
      } else {
        // Normal login
        onLogin();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <FormIcon>🔐</FormIcon>
          <LoginTitle>Welcome Back</LoginTitle>
          <LoginSubtitle>Sign in to your account</LoginSubtitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Select Role</Label>
            <LoginSelect value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="platform">Platform Admin</option>
              <option value="organization">Organization</option>
              <option value="user">User</option>
            </LoginSelect>
          </FormGroup>

          <FormGroup>
            <Label>Email Address</Label>
            <InputWrapper>
              <LoginInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <InputWrapper>
              <LoginInput
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputWrapper>
          </FormGroup>

          <LoginButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </LoginButton>
        </LoginForm>
      </LoginCard>

      {loading && (
        <LoadingOverlay>
          <LoadingContainer>
            <Spinner />
            <LoadingText>Authenticating...</LoadingText>
          </LoadingContainer>
        </LoadingOverlay>
      )}

      {/* Error modal */}
      {error && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <ModalIcon>⚠️</ModalIcon>
              <ModalTitle>Authentication Error</ModalTitle>
            </ModalHeader>
            <ModalText>{error}</ModalText>
            <ModalActions>
              <CloseButton onClick={() => setError("")}>Try Again</CloseButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}

      {/* Wallet modal shown on first login */}
      {walletInfo && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <ModalIcon>🔑</ModalIcon>
              <ModalTitle>Your Wallet Has Been Created</ModalTitle>
            </ModalHeader>
           <ModalContent as="div">
              <p><strong>Address:</strong> {walletInfo.address}</p>
              <p><strong>Private Key:</strong> {walletInfo.privateKey}</p>
              <br />
              ⚠️ Please save this private key securely. 
              You will need it to import your wallet into MetaMask. 
              It will not be shown again.
            </ModalContent>
            <ModalActions>
              <CloseButton
                onClick={() => {
                  setWalletInfo(null);
                  onLogin();
                }}
              >
                I Have Saved It
              </CloseButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </LoginContainer>
  );
}

export default Login;
