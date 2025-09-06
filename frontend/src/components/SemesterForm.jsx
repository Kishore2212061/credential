import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  SemesterContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  SemesterForm as StyledForm,
  FormSection,
  FormRow,
  FormGroup,
  Label,
  Input,
  InputWrapper,
  InputIcon,
  Select,
  SubjectSection,
  SubjectHeader,
  SubjectTitle,
  SubjectSubtitle,
  SubjectRow,
  SubjectInput,
  SubjectInputWrapper,
  SubjectInputIcon,
  RemoveButton,
  AddSubjectButton,
  SubmitButton,
  FormActions,
  LoadingOverlay,
  Spinner,
  LoadingText,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalContent,
  ModalActions,
  CloseButton,
  SuccessIcon,
  ErrorIcon
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
      <FormHeader>
        <FormTitle>Add/Update Semester</FormTitle>
        <FormSubtitle>Create or update academic semester records for students</FormSubtitle>
      </FormHeader>

      <StyledForm onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label>Select User</Label>
            <InputWrapper>
              <InputIcon>👤</InputIcon>
              <Select name="userId" value={form.userId} onChange={handleChange} required>
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.email}
                  </option>
                ))}
              </Select>
            </InputWrapper>
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Semester Number</Label>
              <InputWrapper>
                <InputIcon>🔢</InputIcon>
                <Input
                  type="number"
                  name="semesterNumber"
                  placeholder="Enter semester number"
                  value={form.semesterNumber}
                  onChange={handleChange}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Month & Year of Exam</Label>
              <InputWrapper>
                <InputIcon>📅</InputIcon>
                <Input
                  type="text"
                  name="monthYearOfExam"
                  placeholder="NOV. 2024"
                  value={form.monthYearOfExam}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Date of Publication</Label>
              <InputWrapper>
                <InputIcon>📆</InputIcon>
                <Input
                  type="date"
                  name="dateOfPublication"
                  value={form.dateOfPublication}
                  onChange={handleChange}
                  required
                />
              </InputWrapper>
            </FormGroup>
          </FormRow>

          <SubjectSection>
            <SubjectHeader>
              <SubjectTitle>Subjects ({form.subjects.length})</SubjectTitle>
              <SubjectSubtitle>Add subjects and their details for this semester</SubjectSubtitle>
            </SubjectHeader>

            {form.subjects.map((subject, index) => (
              <SubjectRow key={index}>
                <SubjectInputWrapper>
                  <SubjectInputIcon>📚</SubjectInputIcon>
                  <SubjectInput
                    type="text"
                    name="subjectCode"
                    placeholder="Subject Code"
                    value={subject.subjectCode}
                    onChange={(e) => handleChange(e, index)}
                  />
                </SubjectInputWrapper>

                <SubjectInputWrapper>
                  <SubjectInputIcon>📖</SubjectInputIcon>
                  <SubjectInput
                    type="text"
                    name="subjectTitle"
                    placeholder="Subject Title"
                    value={subject.subjectTitle}
                    onChange={(e) => handleChange(e, index)}
                  />
                </SubjectInputWrapper>

                <SubjectInputWrapper>
                  <SubjectInputIcon>⚖️</SubjectInputIcon>
                  <SubjectInput
                    type="number"
                    name="credits"
                    placeholder="Credits"
                    value={subject.credits}
                    onChange={(e) => handleChange(e, index)}
                  />
                </SubjectInputWrapper>

                <SubjectInputWrapper>
                  <SubjectInputIcon>⭐</SubjectInputIcon>
                  <SubjectInput
                    type="text"
                    name="grade"
                    placeholder="Grade (A, B, C, D, F)"
                    value={subject.grade}
                    onChange={(e) => handleChange(e, index)}
                  />
                </SubjectInputWrapper>

                <SubjectInputWrapper>
                  <SubjectInputIcon>✅</SubjectInputIcon>
                  <SubjectInput
                    type="text"
                    name="result"
                    placeholder="Result (PASS/FAIL)"
                    value={subject.result}
                    onChange={(e) => handleChange(e, index)}
                  />
                </SubjectInputWrapper>

                {form.subjects.length > 1 && (
                  <RemoveButton type="button" onClick={() => removeSubject(index)}>
                    🗑️
                  </RemoveButton>
                )}
              </SubjectRow>
            ))}

            <AddSubjectButton type="button" onClick={addSubject}>
              ➕ Add Subject
            </AddSubjectButton>
          </SubjectSection>

          <FormRow>
            <FormGroup>
              <Label>GPA</Label>
              <InputWrapper>
                <InputIcon>📊</InputIcon>
                <Input
                  type="number"
                  name="gpa"
                  placeholder="Enter GPA"
                  value={form.gpa}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="10"
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>CGPA</Label>
              <InputWrapper>
                <InputIcon>📈</InputIcon>
                <Input
                  type="number"
                  name="cgpa"
                  placeholder="Enter CGPA"
                  value={form.cgpa}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="10"
                />
              </InputWrapper>
            </FormGroup>
          </FormRow>

          <FormActions>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Semester"}
            </SubmitButton>
          </FormActions>
        </FormSection>
      </StyledForm>

      {loading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Processing semester data...</LoadingText>
        </LoadingOverlay>
      )}

      {error && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <ModalIcon>
                <ErrorIcon>⚠️</ErrorIcon>
              </ModalIcon>
              <ModalTitle>Error</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>{error}</p>
            </ModalContent>
            <ModalActions>
              <CloseButton onClick={() => setError("")}>Close</CloseButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}

      {success && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <ModalIcon>
                <SuccessIcon>✅</SuccessIcon>
              </ModalIcon>
              <ModalTitle>Success</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>{success}</p>
            </ModalContent>
            <ModalActions>
              <CloseButton onClick={() => setSuccess("")}>Close</CloseButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </SemesterContainer>
  );
}

export default SemesterForm;
