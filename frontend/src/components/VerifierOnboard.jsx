import React, { useState, useEffect, useCallback } from "react";
import { api } from "../utils/api";
import {
  VerifierContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  VerifierForm,
  FormSection,
  FormGroup,
  Label,
  Input,
  InputWrapper,
  InputIcon,
  Select,
  StudentSection,
  StudentHeader,
  StudentTitle,
  StudentSubtitle,
  SearchWrapper,
  SearchIcon,
  StudentList,
  StudentItem,
  StudentCheckbox,
  StudentInfo,
  StudentName,
  StudentRegister,
  StudentEmpty,
  SelectedStudents,
  SelectedCount,
  SelectedList,
  SelectedStudent,
  RemoveStudent,
  SubmitButton,
  FormActions,
  LoadingOverlay,
  Spinner,
  LoadingText,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalActions,
  CloseButton,
  SuccessIcon,
  ErrorIcon,
  ModalIcon
} from "./VerifierOnboard.styles";

function VerifierOnboard() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    expiryHours: 24,
    students: [],
  });
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/organization/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStudentSelect = (userId) => {
    setFormData((prev) => {
      const alreadySelected = prev.students.includes(userId);
      return {
        ...prev,
        students: alreadySelected
          ? prev.students.filter((id) => id !== userId)
          : [...prev.students, userId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        companyName: formData.companyName,
        companyEmail: formData.email,
        durationHours: parseInt(formData.expiryHours, 10),
        students: formData.students.map((id) => ({ user: id })),
      };

      await api.post("/verifier/invite", payload);

      setSuccess("Verifier invited successfully!");
      setFormData({
        companyName: "",
        email: "",
        expiryHours: 24,
        students: [],
      });
      setSearchQuery(""); // Clear search query after submission
    } catch (err) {
      setError(err.response?.data?.message || "Failed to invite verifier");
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((u) =>
    u.userDetail?.registerNo
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <VerifierContainer>
      <FormHeader>
        <FormTitle>Invite Verifier</FormTitle>
        <FormSubtitle>Send verification access to external verifiers</FormSubtitle>
      </FormHeader>

      <VerifierForm onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label>Company Name</Label>
            <InputWrapper>
              <InputIcon>🏢</InputIcon>
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Verifier Email</Label>
            <InputWrapper>
              <InputIcon>📧</InputIcon>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter verifier email"
                required
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Access Duration</Label>
            <InputWrapper>
              <InputIcon>⏰</InputIcon>
              <Select
                name="expiryHours"
                value={formData.expiryHours}
                onChange={handleChange}
              >
                <option value={12}>12 Hours</option>
                <option value={24}>24 Hours</option>
                <option value={48}>48 Hours</option>
                <option value={72}>3 Days</option>
              </Select>
            </InputWrapper>
          </FormGroup>

          <StudentSection>
            <StudentHeader>
              <StudentTitle>Select Students ({formData.students.length} selected)</StudentTitle>
              <StudentSubtitle>Choose which students the verifier can access</StudentSubtitle>
            </StudentHeader>

            <FormGroup>
              <Label>Search Students</Label>
              <SearchWrapper>
                <SearchIcon>🔍</SearchIcon>
                <Input
                  type="text"
                  placeholder="Search by register number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchWrapper>
            </FormGroup>

            {searchQuery.length > 0 && (
              <StudentList>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <StudentItem key={u._id}>
                      <StudentCheckbox
                        type="checkbox"
                        checked={formData.students.includes(u._id)}
                        onChange={() => handleStudentSelect(u._id)}
                      />
                      <StudentInfo>
                        <StudentName>{u.userDetail?.name || 'Unknown Student'}</StudentName>
                        <StudentRegister>Reg: {u.userDetail?.registerNo || 'N/A'}</StudentRegister>
                      </StudentInfo>
                    </StudentItem>
                  ))
                ) : (
                  <StudentEmpty>
                    <p>No matching students found</p>
                  </StudentEmpty>
                )}
              </StudentList>
            )}

            {formData.students.length > 0 && (
              <SelectedStudents>
                <SelectedCount>Selected Students ({formData.students.length})</SelectedCount>
                <SelectedList>
                  {formData.students.map((studentId) => {
                    const student = users.find(u => u._id === studentId);
                    return (
                      <SelectedStudent key={studentId}>
                        <StudentInfo>
                          <StudentName>{student?.userDetail?.name || 'Unknown Student'}</StudentName>
                          <StudentRegister>Reg: {student?.userDetail?.registerNo || 'N/A'}</StudentRegister>
                        </StudentInfo>
                        <RemoveStudent onClick={() => handleStudentSelect(studentId)}>
                          ✕
                        </RemoveStudent>
                      </SelectedStudent>
                    );
                  })}
                </SelectedList>
              </SelectedStudents>
            )}
          </StudentSection>

          <FormActions>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Sending Invite..." : "Send Invite"}
            </SubmitButton>
          </FormActions>
        </FormSection>
      </VerifierForm>

      {loading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Sending invitation...</LoadingText>
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
    </VerifierContainer>
  );
}

export default VerifierOnboard;