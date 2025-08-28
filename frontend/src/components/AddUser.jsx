import React, { useState } from 'react';
import { api } from '../utils/api';

function AddUser({ onAdd }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/organization/users', { email, password });
      setEmail('');
      setPassword('');
      onAdd();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    }
  };

  return (
    <div>
      <h4>Add User</h4>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add User</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AddUser;