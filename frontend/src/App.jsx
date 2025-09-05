import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useSearchParams } from "react-router-dom";

import Login from "./components/Login";
import PlatformDashboard from "./components/PlatformDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard";
import UserDashboard from "./components/UserDashboard";
import VerifierDashboard from "./components/VerifierDashboard";

import { getToken, getRole, clearAuth, api } from "./utils/api";

import {
  AppContainer,
  Navbar,
  NavbarBrand,
  NavbarTitle,
  LogoutButton,
  LoadingOverlay,
  LoadingContainer,
  Spinner,
  LoadingText,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalText,
  ModalActions,
  CloseButton
} from "./App.styles";

// Wrapper for Verifier route
function VerifierRoute() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [valid, setValid] = useState(null); // null = loading, true = ok, false = invalid

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await api.get(`/verifier/validate?token=${token}`);
        if (res.data.valid) {
          localStorage.setItem("verifierToken", token);
          setValid(true);
        } else {
          setValid(false);
        }
      } catch (err) {
        setValid(false);
      }
    };
    if (token) validateToken();
    else setValid(false);
  }, [token]);

  if (valid === null) {
    return (
      <LoadingOverlay>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Validating link...</LoadingText>
        </LoadingContainer>
      </LoadingOverlay>
    );
  }

  if (!valid) {
    return (
      <ModalOverlay>
        <Modal>
          <ModalHeader>
            <ModalIcon>⚠️</ModalIcon>
            <ModalTitle>Invalid or Expired Link</ModalTitle>
          </ModalHeader>
          <ModalText>This verification link has expired or is invalid.</ModalText>
        </Modal>
      </ModalOverlay>
    );
  }

  return <VerifierDashboard />; // ✅ show verifier student cards
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [role, setRole] = useState(getRole());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    try {
      setIsAuthenticated(!!getToken());
      setRole(getRole());
    } catch (err) {
      setError("Failed to load authentication data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setRole(getRole());
  };

  const handleLogout = () => {
    clearAuth();
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <Router>
      <AppContainer>
        {isAuthenticated && (
          <Navbar>
            <NavbarBrand>
              <NavbarTitle>Decentralized Credential Issuance</NavbarTitle>
            </NavbarBrand>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </Navbar>
        )}

        {loading && (
          <LoadingOverlay>
            <LoadingContainer>
              <Spinner />
              <LoadingText>Loading...</LoadingText>
            </LoadingContainer>
          </LoadingOverlay>
        )}

        {error && (
          <ModalOverlay>
            <Modal>
              <ModalHeader>
                <ModalIcon>⚠️</ModalIcon>
                <ModalTitle>Error</ModalTitle>
              </ModalHeader>
              <ModalText>{error}</ModalText>
              <ModalActions>
                <CloseButton onClick={() => setError("")}>Close</CloseButton>
              </ModalActions>
            </Modal>
          </ModalOverlay>
        )}

        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                role === "platform" ? (
                  <PlatformDashboard />
                ) : role === "organization" ? (
                  <OrganizationDashboard />
                ) : role === "user" ? (
                  <UserDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ✅ Add verifier route */}
          <Route path="/verify" element={<VerifierRoute />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
