import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function IssueCredential({ setSuccess, setError }) {
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({ userId: '', semesterNumber: '', templateId: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get('/organization/users');
        setUsers(userRes.data || []);

        const templateRes = await api.get('/template');
        setTemplates(templateRes.data || []);
      } catch (err) {
        setError('Failed to fetch users/templates');
      }
    };
    fetchData();
  }, [setError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/credential/issue', form);
      setForm({ userId: '', semesterNumber: '', templateId: '' });
      setSuccess('Credential issued successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue credential');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="issue-credential">
      <h3>Issue Credential</h3>

      <form onSubmit={handleSubmit}>
        <select name="userId" value={form.userId} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.email}</option>
          ))}
        </select>

        <input
          type="number"
          name="semesterNumber"
          placeholder="Semester Number"
          value={form.semesterNumber}
          onChange={handleChange}
          required
        />

        <select name="templateId" value={form.templateId} onChange={handleChange} required>
          <option value="">Select Template</option>
          {templates.map((template) => (
            <option key={template._id} value={template._id}>{template.name}</option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Issuing...' : 'Issue Credential'}
        </button>
      </form>
    </div>
  );
}

export default IssueCredential;
