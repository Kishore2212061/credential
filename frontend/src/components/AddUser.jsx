import React, { useState } from 'react';
import { api } from '../utils/api';

function AddUser({ onAdd }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/organization/users', { email, password });
      setEmail('');
      setPassword('');
      setSuccess('User added successfully!');
      onAdd();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Add User</h4>
      <form className="add-user-form" onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>Add User</button>
      </form>

      {loading && <div className="loader"></div>}

      {error && (
        <div className="modal">
          <div className="modal-content error">
            <p>{error}</p>
            <button onClick={() => setError('')}>Close</button>
          </div>
        </div>
      )}

      {success && (
        <div className="modal">
          <div className="modal-content success">
            <p>{success}</p>
            <button onClick={() => setSuccess('')}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;
