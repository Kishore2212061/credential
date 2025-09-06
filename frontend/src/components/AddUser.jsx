import React, { useState } from "react";
import { api } from "../utils/api";
import {
  AddUserContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  AddUserForm,
  FormSection,
  FormGroup,
  Label,
  Input,
  InputWrapper,
  InputIcon,
  ValidationMessage,
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
} from "./AddUser.styles";

function AddUser({ onAdd }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    degree: "",
    branch: "",
    mode: "",
    registerNo: "",
    regulations: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validation, setValidation] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    const errors = { ...validation };

    switch (field) {
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (!value.trim()) {
          errors.password = 'Password is required';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else {
          delete errors.password;
        }
        break;
      case 'name':
        if (value && value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
      case 'registerNo':
        if (value && value.trim().length < 3) {
          errors.registerNo = 'Register number must be at least 3 characters';
        } else {
          delete errors.registerNo;
        }
        break;
      default:
        break;
    }

    setValidation(errors);
    return !errors[field];
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, form[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear validation error when user starts typing
    if (validation[name]) {
      const errors = { ...validation };
      delete errors[name];
      setValidation(errors);
    }
  };

  const validateForm = () => {
    const emailValid = validateField('email', form.email);
    const passwordValid = validateField('password', form.password);
    const nameValid = validateField('name', form.name);
    const registerNoValid = validateField('registerNo', form.registerNo);

    return emailValid && passwordValid && nameValid && registerNoValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
      name: true,
      registerNo: true
    });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/organization/users", form);
      setForm({
        email: "",
        password: "",
        name: "",
        degree: "",
        branch: "",
        mode: "",
        registerNo: "",
        regulations: "",
      });
      setValidation({});
      setTouched({});
      setSuccess("User added successfully!");
      onAdd();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddUserContainer>
      <FormHeader>
        <FormTitle>Add New User</FormTitle>
        <FormSubtitle>Create a new user account for your organization</FormSubtitle>
      </FormHeader>

      <AddUserForm onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label>Email Address *</Label>
            <InputWrapper>
              <InputIcon>📧</InputIcon>
              <Input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                required
                hasError={touched.email && validation.email}
              />
            </InputWrapper>
            {touched.email && validation.email && (
              <ValidationMessage>{validation.email}</ValidationMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Password *</Label>
            <InputWrapper>
              <InputIcon>🔒</InputIcon>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                required
                hasError={touched.password && validation.password}
              />
            </InputWrapper>
            {touched.password && validation.password && (
              <ValidationMessage>{validation.password}</ValidationMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Full Name</Label>
            <InputWrapper>
              <InputIcon>👤</InputIcon>
              <Input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                hasError={touched.name && validation.name}
              />
            </InputWrapper>
            {touched.name && validation.name && (
              <ValidationMessage>{validation.name}</ValidationMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Degree</Label>
            <InputWrapper>
              <InputIcon>🎓</InputIcon>
              <Input
                type="text"
                name="degree"
                placeholder="Enter degree (e.g., B.E, M.Tech)"
                value={form.degree}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Branch</Label>
            <InputWrapper>
              <InputIcon>🏛️</InputIcon>
              <Input
                type="text"
                name="branch"
                placeholder="Enter branch (e.g., Computer Science)"
                value={form.branch}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Mode</Label>
            <InputWrapper>
              <InputIcon>📚</InputIcon>
              <Input
                type="text"
                name="mode"
                placeholder="Enter mode (e.g., Regular, Distance)"
                value={form.mode}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Register Number</Label>
            <InputWrapper>
              <InputIcon>🔢</InputIcon>
              <Input
                type="text"
                name="registerNo"
                placeholder="Enter register number"
                value={form.registerNo}
                onChange={handleChange}
                onBlur={() => handleBlur('registerNo')}
                hasError={touched.registerNo && validation.registerNo}
              />
            </InputWrapper>
            {touched.registerNo && validation.registerNo && (
              <ValidationMessage>{validation.registerNo}</ValidationMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Regulations</Label>
            <InputWrapper>
              <InputIcon>📋</InputIcon>
              <Input
                type="text"
                name="regulations"
                placeholder="Enter regulations (e.g., 2017, 2018)"
                value={form.regulations}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <FormActions>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Adding User..." : "Add User"}
            </SubmitButton>
          </FormActions>
        </FormSection>
      </AddUserForm>

      {loading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Adding user...</LoadingText>
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
    </AddUserContainer>
  );
}

export default AddUser;
