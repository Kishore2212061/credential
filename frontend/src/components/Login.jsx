import React, { useState } from "react";
import { api, setAuth } from "../utils/api";
import { motion } from "framer-motion";

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
  CloseButton,
  BackgroundPattern,
  GlowEffect,
  FloatingElement
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
      <GlowEffect />
      
      {/* Floating decorative elements */}
      <FloatingElement delay={0} />
      <FloatingElement delay={2} />
      <FloatingElement delay={4} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <LoginCard>
          <LoginHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <FormIcon>🔐</FormIcon>
            </motion.div>
            <LoginTitle>Welcome Back</LoginTitle>
            <LoginSubtitle>Sign in to your account to continue</LoginSubtitle>
          </LoginHeader>

          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Select Role</Label>
              <InputWrapper>
                <LoginSelect value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="platform">Platform Admin</option>
                  <option value="organization">Organization</option>
                  <option value="user">User</option>
                </LoginSelect>
              </InputWrapper>
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
      </motion.div>

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