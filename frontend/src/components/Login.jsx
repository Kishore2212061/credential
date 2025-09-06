import React, { useState } from "react";
import { api, setAuth } from "../utils/api";
import { motion } from "framer-motion";

// styled components
import {
  LoginContainer,
  BackgroundPattern,
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
  RoleSelector,
  RoleOption,
  RoleIcon,
  RoleLabel,
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
  CloseButton,
  WalletInfo,
  WalletAddress,
  WalletKey,
  CopyButton,
  SecurityWarning
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
      <BackgroundPattern />
      <LoginCard>
        <LoginHeader>
          <FormIcon>🔐</FormIcon>
          <LoginTitle>Welcome Back</LoginTitle>
          <LoginSubtitle>Sign in to your account</LoginSubtitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Select Role</Label>
            <RoleSelector>
              <RoleOption
                selected={role === "platform"}
                onClick={() => setRole("platform")}
              >
                <RoleIcon>🏢</RoleIcon>
                <RoleLabel>Platform Admin</RoleLabel>
              </RoleOption>
              <RoleOption
                selected={role === "organization"}
                onClick={() => setRole("organization")}
              >
                <RoleIcon>🏛️</RoleIcon>
                <RoleLabel>Organization</RoleLabel>
              </RoleOption>
              <RoleOption
                selected={role === "user"}
                onClick={() => setRole("user")}
              >
                <RoleIcon>👤</RoleIcon>
                <RoleLabel>User</RoleLabel>
              </RoleOption>
            </RoleSelector>
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

          <LoginButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
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
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
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
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <ModalHeader>
              <ModalIcon>🔑</ModalIcon>
              <ModalTitle>Your Wallet Has Been Created</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <WalletInfo>
                <div>
                  <Label>Wallet Address</Label>
                  <WalletAddress>
                    {walletInfo.address}
                    <CopyButton
                      onClick={() => navigator.clipboard.writeText(walletInfo.address)}
                    >
                      📋
                    </CopyButton>
                  </WalletAddress>
                </div>
                <div>
                  <Label>Private Key</Label>
                  <WalletKey>
                    {walletInfo.privateKey}
                    <CopyButton
                      onClick={() => navigator.clipboard.writeText(walletInfo.privateKey)}
                    >
                      📋
                    </CopyButton>
                  </WalletKey>
                </div>
                <SecurityWarning>
                  ⚠️ <strong>Important:</strong> Please save this private key securely.
                  You will need it to import your wallet into MetaMask.
                  It will not be shown again.
                </SecurityWarning>
              </WalletInfo>
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