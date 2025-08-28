import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function UserProfile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user/me');
        setProfile(res.data || {});
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/user/me', profile);
      alert('Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h4>My Profile</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profile.name || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={profile.degree || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={profile.branch || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mode"
          placeholder="Mode"
          value={profile.mode || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="registerNo"
          placeholder="Register No"
          value={profile.registerNo || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="regulations"
          placeholder="Regulations"
          value={profile.regulations || ''}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default UserProfile;