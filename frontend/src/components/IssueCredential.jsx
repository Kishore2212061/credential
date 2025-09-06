import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  IssueCredentialContainer,
  WizardContainer,
  WizardHeader,
  WizardTitle,
  WizardSubtitle,
  WizardSteps,
  StepIndicator,
  StepNumber,
  StepLabel,
  StepConnector,
  WizardContent,
  IssueForm,
  FormSection,
  FormGroup,
  Label,
  Select,
  Input,
  SubmitButton,
  NavigationButtons,
  BackButton,
  NextButton,
  FormValidation,
  ValidationMessage,
  UserCard,
  UserAvatar,
  UserInfo,
  UserName,
  UserEmail,
  TemplateCard,
  TemplateIcon,
  TemplateInfo,
  TemplateName,
  TemplateDescription,
  SummaryCard,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  LoadingOverlay,
  Spinner,
  SuccessMessage
} from "./IssueCredential.styles";

function IssueCredential({ setSuccess, setError }) {
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    semesterNumber: "",
    templateId: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validation, setValidation] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/organization/users");
        setUsers(userRes.data || []);

        const templateRes = await api.get("/template");
        setTemplates(templateRes.data || []);
      } catch (err) {
        setError("Failed to fetch users/templates");
      }
    };
    fetchData();
  }, [setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear validation error when user starts typing
    if (validation[name]) {
      setValidation({ ...validation, [name]: "" });
    }

    // Update selected user/template when changed
    if (name === "userId") {
      const user = users.find(u => u._id === value);
      setSelectedUser(user || null);
    } else if (name === "templateId") {
      const template = templates.find(t => t._id === value);
      setSelectedTemplate(template || null);
    }
  };

  const validateStep = (step) => {
    const errors = {};

    if (step === 1 && !form.userId) {
      errors.userId = "Please select a user";
    }
    if (step === 2 && !form.semesterNumber) {
      errors.semesterNumber = "Please enter a semester number";
    } else if (step === 2 && form.semesterNumber && (isNaN(form.semesterNumber) || form.semesterNumber < 1)) {
      errors.semesterNumber = "Please enter a valid semester number";
    }
    if (step === 3 && !form.templateId) {
      errors.templateId = "Please select a template";
    }

    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      await api.post("/credential/issue", form);
      setForm({ userId: "", semesterNumber: "", templateId: "" });
      setSelectedUser(null);
      setSelectedTemplate(null);
      setCurrentStep(1);
      setSuccess("Credential issued successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to issue credential");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IssueCredentialContainer>
      <WizardContainer>
        <WizardHeader>
          <WizardTitle>Issue Credential</WizardTitle>
          <WizardSubtitle>Create and issue a new credential to a user</WizardSubtitle>
        </WizardHeader>

        <WizardSteps>
          <StepIndicator active={currentStep >= 1} completed={currentStep > 1}>
            <StepNumber>1</StepNumber>
            <StepLabel>Select User</StepLabel>
          </StepIndicator>
          <StepConnector active={currentStep > 1} />
          <StepIndicator active={currentStep >= 2} completed={currentStep > 2}>
            <StepNumber>2</StepNumber>
            <StepLabel>Semester Details</StepLabel>
          </StepIndicator>
          <StepConnector active={currentStep > 2} />
          <StepIndicator active={currentStep >= 3} completed={currentStep > 3}>
            <StepNumber>3</StepNumber>
            <StepLabel>Choose Template</StepLabel>
          </StepIndicator>
        </WizardSteps>

        <WizardContent>
          <IssueForm onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <FormSection>
                <h4>Select User</h4>
                <p>Choose the user who will receive this credential</p>

                <FormGroup>
                  <Label>User</Label>
                  <Select
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.email}
                      </option>
                    ))}
                  </Select>
                  {validation.userId && (
                    <ValidationMessage>{validation.userId}</ValidationMessage>
                  )}
                </FormGroup>

                {selectedUser && (
                  <UserCard>
                    <UserAvatar>
                      {selectedUser.email.charAt(0).toUpperCase()}
                    </UserAvatar>
                    <UserInfo>
                      <UserName>{selectedUser.email}</UserName>
                      <UserEmail>Selected User</UserEmail>
                    </UserInfo>
                  </UserCard>
                )}
              </FormSection>
            )}

            {currentStep === 2 && (
              <FormSection>
                <h4>Semester Details</h4>
                <p>Enter the semester information for this credential</p>

                <FormGroup>
                  <Label>Semester Number</Label>
                  <Input
                    type="number"
                    name="semesterNumber"
                    placeholder="Enter semester number (e.g., 1, 2, 3...)"
                    value={form.semesterNumber}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                  {validation.semesterNumber && (
                    <ValidationMessage>{validation.semesterNumber}</ValidationMessage>
                  )}
                </FormGroup>
              </FormSection>
            )}

            {currentStep === 3 && (
              <FormSection>
                <h4>Choose Template</h4>
                <p>Select the template for this credential</p>

                <FormGroup>
                  <Label>Template</Label>
                  <Select
                    name="templateId"
                    value={form.templateId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Template</option>
                    {templates.map((template) => (
                      <option key={template._id} value={template._id}>
                        {template.name}
                      </option>
                    ))}
                  </Select>
                  {validation.templateId && (
                    <ValidationMessage>{validation.templateId}</ValidationMessage>
                  )}
                </FormGroup>

                {selectedTemplate && (
                  <TemplateCard>
                    <TemplateIcon>📄</TemplateIcon>
                    <TemplateInfo>
                      <TemplateName>{selectedTemplate.name}</TemplateName>
                      <TemplateDescription>
                        {selectedTemplate.description || "No description available"}
                      </TemplateDescription>
                    </TemplateInfo>
                  </TemplateCard>
                )}
              </FormSection>
            )}

            {currentStep === 4 && (
              <FormSection>
                <h4>Review & Confirm</h4>
                <p>Review the details before issuing the credential</p>

                <SummaryCard>
                  <SummaryItem>
                    <SummaryLabel>User:</SummaryLabel>
                    <SummaryValue>{selectedUser?.email || "Not selected"}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Semester:</SummaryLabel>
                    <SummaryValue>{form.semesterNumber || "Not specified"}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Template:</SummaryLabel>
                    <SummaryValue>{selectedTemplate?.name || "Not selected"}</SummaryValue>
                  </SummaryItem>
                </SummaryCard>
              </FormSection>
            )}

            <NavigationButtons>
              {currentStep > 1 && (
                <BackButton type="button" onClick={handleBack}>
                  ← Back
                </BackButton>
              )}

              {currentStep < 4 ? (
                <NextButton type="button" onClick={handleNext}>
                  Next →
                </NextButton>
              ) : (
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Issuing..." : "Issue Credential"}
                </SubmitButton>
              )}
            </NavigationButtons>
          </IssueForm>
        </WizardContent>
      </WizardContainer>

      {loading && (
        <LoadingOverlay>
          <Spinner />
          <SuccessMessage>Issuing credential...</SuccessMessage>
        </LoadingOverlay>
      )}
    </IssueCredentialContainer>
  );
}

export default IssueCredential;
