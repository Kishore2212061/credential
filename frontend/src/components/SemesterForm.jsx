import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  SemesterContainer,
  SemesterForm as StyledForm,
  FormRow,
  FormGroup,
  Label,
  Input,
  Select,
  SubjectSection,
  SubjectRow,
  SubjectInput,
  RemoveButton,
  AddSubjectButton,
  SubmitButton,
  Loader,
  Modal,
  ModalContent,
} from "./SemesterForm.styles";

function SemesterForm() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    semesterNumber: "",
    monthYearOfExam: "",
    dateOfPublication: "",
    subjects: [
      { subjectCode: "", subjectTitle: "", credits: "", grade: "", result: "" },
    ],
    gpa: "",
    cgpa: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/organization/users");
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

  const removeSubject = (index) => {
    const newSubjects = form.subjects.filter((_, i) => i !== index);
    setForm({ ...form, subjects: newSubjects });
  };

  const addSubject = () => {
    setForm({
      ...form,
      subjects: [
        ...form.subjects,
        { subjectCode: "", subjectTitle: "", credits: "", grade: "", result: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.put("/semester", form);
      setForm({
        userId: "",
        semesterNumber: "",
        monthYearOfExam: "",
        dateOfPublication: "",
        subjects: [
          { subjectCode: "", subjectTitle: "", credits: "", grade: "", result: "" },
        ],
        gpa: "",
        cgpa: "",
      });
      setSuccess("Semester added/updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add semester");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SemesterContainer>
      <h4>Add/Update Semester</h4>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>User</Label>
          <Select name="userId" value={form.userId} onChange={handleChange} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label>Semester Number</Label>
            <Input
              type="number"
              name="semesterNumber"
              placeholder="Semester Number"
              value={form.semesterNumber}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Month & Year of Exam</Label>
            <Input
              type="text"
              name="monthYearOfExam"
              placeholder="NOV. 2024"
              value={form.monthYearOfExam}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Date of Publication</Label>
            <Input
              type="date"
              name="dateOfPublication"
              value={form.dateOfPublication}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>

        <SubjectSection>
          <h5>Subjects</h5>
          {form.subjects.map((subject, index) => (
            <SubjectRow key={index}>
              <SubjectInput
                type="text"
                name="subjectCode"
                placeholder="Subject Code"
                value={subject.subjectCode}
                onChange={(e) => handleChange(e, index)}
              />
              <SubjectInput
                type="text"
                name="subjectTitle"
                placeholder="Subject Title"
                value={subject.subjectTitle}
                onChange={(e) => handleChange(e, index)}
              />
              <SubjectInput
                type="number"
                name="credits"
                placeholder="Credits"
                value={subject.credits}
                onChange={(e) => handleChange(e, index)}
              />
              <SubjectInput
                type="text"
                name="grade"
                placeholder="Grade"
                value={subject.grade}
                onChange={(e) => handleChange(e, index)}
              />
              <SubjectInput
                type="text"
                name="result"
                placeholder="Result"
                value={subject.result}
                onChange={(e) => handleChange(e, index)}
              />
              {form.subjects.length > 1 && (
                <RemoveButton type="button" onClick={() => removeSubject(index)}>
                  ×
                </RemoveButton>
              )}
            </SubjectRow>
          ))}
          <AddSubjectButton type="button" onClick={addSubject}>
            Add Subject
          </AddSubjectButton>
        </SubjectSection>

        <FormRow>
          <FormGroup>
            <Label>GPA</Label>
            <Input
              type="number"
              name="gpa"
              placeholder="GPA"
              value={form.gpa}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>CGPA</Label>
            <Input
              type="number"
              name="cgpa"
              placeholder="CGPA"
              value={form.cgpa}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <SubmitButton type="submit" disabled={loading}>
          Submit Semester
        </SubmitButton>
      </StyledForm>

      {loading && <Loader />}

      {error && (
        <Modal>
          <ModalContent className="error">
            <p>{error}</p>
            <button onClick={() => setError("")}>Close</button>
          </ModalContent>
        </Modal>
      )}

      {success && (
        <Modal>
          <ModalContent className="success">
            <p>{success}</p>
            <button onClick={() => setSuccess("")}>Close</button>
          </ModalContent>
        </Modal>
      )}
    </SemesterContainer>
  );
}

export default SemesterForm;
