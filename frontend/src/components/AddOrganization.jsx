import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  AddOrgContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  AddOrgForm,
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
} from "./AddOrganization.styles";

function AddOrganization({ onAdd, editOrg, clearEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validation, setValidation] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (editOrg) {
      setName(editOrg.name);
      setEmail(editOrg.email);
      setPassword(""); // password empty for security
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [editOrg]);

  const validateField = (field, value) => {
    const errors = { ...validation };

    switch (field) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Organization name is required';
        } else if (value.trim().length < 2) {
          errors.name = 'Organization name must be at least 2 characters';
        } else {
          delete errors.name;
        }
        break;
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
        if (!editOrg && !value.trim()) {
          errors.password = 'Password is required for new organizations';
        } else if (value && value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        } else {
          delete errors.password;
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
    validateField(field, field === 'name' ? name : field === 'email' ? email : password);
  };

  const handleChange = (field, value) => {
    if (field === 'name') setName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);

    // Clear validation error when user starts typing
    if (validation[field]) {
      const errors = { ...validation };
      delete errors[field];
      setValidation(errors);
    }
  };

  const validateForm = () => {
    const nameValid = validateField('name', name);
    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    return nameValid && emailValid && passwordValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true });

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (editOrg) {
        await api.put(`/platform/organizations/${editOrg._id}`, {
          name,
          email,
          password,
        });
        setSuccess("Organization updated successfully!");
        clearEdit();
      } else {
        await api.post("/platform/organizations", {
          name,
          email,
          password,
        });
        setSuccess("Organization added successfully!");
      }
      setName("");
      setEmail("");
      setPassword("");
      setValidation({});
      setTouched({});
      onAdd();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddOrgContainer>
      <FormHeader>
        <FormTitle>{editOrg ? "Edit Organization" : "Add Organization"}</FormTitle>
        <FormSubtitle>
          {editOrg ? "Update organization details" : "Create a new organization account"}
        </FormSubtitle>
      </FormHeader>

      <AddOrgForm onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label>Organization Name</Label>
            <InputWrapper>
              <InputIcon>🏢</InputIcon>
              <Input
                type="text"
                placeholder="Enter organization name"
                value={name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                required
                hasError={touched.name && validation.name}
              />
            </InputWrapper>
            {touched.name && validation.name && (
              <ValidationMessage>{validation.name}</ValidationMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Email Address</Label>
            <InputWrapper>
              <InputIcon>📧</InputIcon>
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
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
            <Label>
              Password
              {!editOrg && <span style={{ color: '#ef4444' }}> *</span>}
              {editOrg && <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '400' }}> (leave blank to keep current)</span>}
            </Label>
            <InputWrapper>
              <InputIcon>🔒</InputIcon>
              <Input
                type="password"
                placeholder={editOrg ? "Enter new password (optional)" : "Enter password"}
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                required={!editOrg}
                hasError={touched.password && validation.password}
              />
            </InputWrapper>
            {touched.password && validation.password && (
              <ValidationMessage>{validation.password}</ValidationMessage>
            )}
          </FormGroup>

          <FormActions>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Processing..." : editOrg ? "Update Organization" : "Add Organization"}
            </SubmitButton>
          </FormActions>
        </FormSection>
      </AddOrgForm>

      {/* Loading */}
      {loading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Processing your request...</LoadingText>
        </LoadingOverlay>
      )}

      {/* Error Modal */}
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

      {/* Success Modal */}
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
    </AddOrgContainer>
  );
}

export default AddOrganization;
