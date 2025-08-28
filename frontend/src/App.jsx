import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PlatformDashboard from './components/PlatformDashboard';
import OrganizationDashboard from './components/OrganizationDashboard';
import UserDashboard from './components/UserDashboard';
import { getToken, getRole, clearAuth } from './utils/api';
import './App.css';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    setIsAuthenticated(!!getToken());
    setRole(getRole());
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
      <div className="app">
        {isAuthenticated && (
          <nav className="navbar">
            <h2>Onboarding App</h2>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </nav>
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
                role === 'platform' ? (
                  <PlatformDashboard />
                ) : role === 'organization' ? (
                  <OrganizationDashboard />
                ) : role === 'user' ? (
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