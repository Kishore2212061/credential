import React, { useState } from 'react';
import { api } from '../utils/api';

function TemplateForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    title: '',       // new
    program: '',     // new
    html: '',
    css: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/template', form);
      setForm({ name: '', description: '', title: '', program: '', html: '', css: '' });
      alert('Template added/updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add template');
    }
  };

  return (
    <div>
      <h4>Add/Update Template</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Template Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Certificate Title (e.g. GRADE SHEET)"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="program"
          placeholder="Program (e.g. B.E Degree Examinations)"
          value={form.program}
          onChange={handleChange}
        />
        <textarea
          name="html"
          placeholder="HTML (Handlebars)"
          value={form.html}
          onChange={handleChange}
          rows="5"
          required
        />
        <textarea
          name="css"
          placeholder="CSS"
          value={form.css}
          onChange={handleChange}
          rows="5"
        />
        <button type="submit">Submit Template</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default TemplateForm;
