import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  ProfileContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  ProfileForm,
  FormSection,
  FormGroup,
  Label,
  Input,
  InputWrapper,
  InputIcon,
  ValidationMessage,
  ProfileButton,
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
} from "./UserProfile.styles";

function UserProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validation, setValidation] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get("/user/me");
        setProfile(res.data || {});
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.put("/user/me", profile);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const validateField = (field, value) => {
    const errors = { ...validation };

    switch (field) {
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
    validateField(field, profile[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    // Clear validation error when user starts typing
    if (validation[name]) {
      const errors = { ...validation };
      delete errors[name];
      setValidation(errors);
    }
  };

  return (
    <ProfileContainer>
      <FormHeader>
        <FormTitle>My Profile</FormTitle>
        <FormSubtitle>Update your personal and academic information</FormSubtitle>
      </FormHeader>

      <ProfileForm onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label>Full Name</Label>
            <InputWrapper>
              <InputIcon>👤</InputIcon>
              <Input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={profile.name || ""}
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
                placeholder="Enter your degree (e.g., B.E, M.Tech)"
                value={profile.degree || ""}
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
                placeholder="Enter your branch (e.g., Computer Science)"
                value={profile.branch || ""}
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
                value={profile.mode || ""}
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
                placeholder="Enter your register number"
                value={profile.registerNo || ""}
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
                value={profile.regulations || ""}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <FormActions>
            <ProfileButton type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </ProfileButton>
          </FormActions>
        </FormSection>
      </ProfileForm>

      {loading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Loading profile...</LoadingText>
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
    </ProfileContainer>
  );
}

export default UserProfile;
