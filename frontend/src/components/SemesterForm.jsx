import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

function SemesterForm() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userId: '',
    semesterNumber: '',
    monthYearOfExam: '',
    dateOfPublication: '',
    subjects: [{ subjectCode: '', subjectTitle: '', credits: '', grade: '', result: '' }],
    gpa: '',
    cgpa: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/organization/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e, index) => {
    if (index !== undefined) {
      const newSubjects = [...form.subjects];
      newSubjects[index][e.target.name] = e.target.value;
      setForm({ ...form, subjects: newSubjects });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addSubject = () => {
    setForm({
      ...form,
      subjects: [...form.subjects, { subjectCode: '', subjectTitle: '', credits: '', grade: '', result: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/semester', form);
      setForm({
        userId: '',
        semesterNumber: '',
        monthYearOfExam: '',
        dateOfPublication: '',
        subjects: [{ subjectCode: '', subjectTitle: '', credits: '', grade: '', result: '' }],
        gpa: '',
        cgpa: ''
      });
      alert('Semester added/updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add semester');
    }
  };

  return (
    <div>
      <h4>Add/Update Semester</h4>
      <form onSubmit={handleSubmit}>
        <select name="userId" value={form.userId} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map(user => (
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
        <input
          type="text"
          name="monthYearOfExam"
          placeholder="Month & Year (e.g., NOV. 2024)"
          value={form.monthYearOfExam}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfPublication"
          value={form.dateOfPublication}
          onChange={handleChange}
          required
        />
        {form.subjects.map((subject, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="subjectCode"
              placeholder="Subject Code"
              value={subject.subjectCode}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              type="text"
              name="subjectTitle"
              placeholder="Subject Title"
              value={subject.subjectTitle}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              value={subject.credits}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              type="text"
              name="grade"
              placeholder="Grade"
              value={subject.grade}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              type="text"
              name="result"
              placeholder="Result"
              value={subject.result}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <button type="button" onClick={addSubject}>Add Subject</button>
        <input
          type="number"
          name="gpa"
          placeholder="GPA"
          value={form.gpa}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cgpa"
          placeholder="CGPA"
          value={form.cgpa}
          onChange={handleChange}
        />
        <button type="submit">Submit Semester</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default SemesterForm;