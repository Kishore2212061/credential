import React, { useState } from 'react';
import { api, setAuth } from '../utils/api';
import './Login.css'
function Login({ onLogin }) {
  const [role, setRole] = useState('platform');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { role, email, password });
      setAuth(res.data.token, res.data.role, res.data.id);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="platform">Platform</option>
          <option value="organization">Organization</option>
          <option value="user">User</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;