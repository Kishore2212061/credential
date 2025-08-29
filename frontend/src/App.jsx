import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login";
import PlatformDashboard from "./components/PlatformDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard";
import UserDashboard from "./components/UserDashboard";
import { getToken, getRole, clearAuth } from "./utils/api";

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
      <div className="app-container">
        {isAuthenticated && (
          <nav className="navbar">
            <div className="navbar-brand">
              <h1 className="navbar-title">Decentralized Credential Issuance</h1>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <span className="modal-icon">⚠️</span>
                <h3 className="modal-title">Error</h3>
              </div>
              <p className="modal-text">{error}</p>
              <div className="modal-actions">
                <button className="close-button" onClick={() => setError("")}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
          />
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
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
