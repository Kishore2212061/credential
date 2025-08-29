import React, { useState } from 'react';
import { api } from '../utils/api';

function TemplateForm() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    title: '',
    program: '',
    html: '',
    css: ''
  });

  const [modal, setModal] = useState({ type: '', message: '', visible: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal({ type: 'loading', message: 'Submitting template...', visible: true });

    try {
      await api.put('/template', form);
      setForm({ name: '', description: '', title: '', program: '', html: '', css: '' });
      setModal({ type: 'success', message: 'Template added/updated successfully!', visible: true });
    } catch (err) {
      setModal({
        type: 'error',
        message: err.response?.data?.message || 'Failed to add template',
        visible: true
      });
    }
  };

  return (
    <div className="template-form-container">
      <h4>Add/Update Template</h4>
      <form onSubmit={handleSubmit} className="template-form">
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
      </form>

      {/* ✅ Modal */}
      {modal.visible && (
        <div className="template-modal-overlay">
          <div className={`template-modal ${modal.type}`}>
            {modal.type === 'loading' && <div className="template-loader"></div>}
            <p>{modal.message}</p>
            {modal.type !== 'loading' && (
              <button onClick={() => setModal({ ...modal, visible: false })}>
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateForm;
