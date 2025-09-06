import React, { useState } from "react";
import { api } from "../utils/api";
import {
  TemplateFormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  TemplateForm as StyledForm,
  FormSection,
  FormRow,
  FormGroup,
  Label,
  Input,
  InputWrapper,
  InputIcon,
  TextArea,
  CodeSection,
  CodeHeader,
  CodeTitle,
  CodeSubtitle,
  CodeGroup,
  CodeLabel,
  CodeTextArea,
  SubmitButton,
  FormActions,
  LoadingOverlay,
  Spinner,
  LoadingText,
  TemplateModalOverlay,
  TemplateModal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalIcon,
  ModalActions,
  CloseButton,
  SuccessIcon,
  ErrorIcon
} from "./TemplateForm.styles";

function TemplateForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    title: "",
    program: "",
    html: "",
    css: "",
  });

  const [modal, setModal] = useState({ type: "", message: "", visible: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal({
      type: "loading",
      message: "Submitting template...",
      visible: true,
    });

    try {
      await api.put("/template", form);
      setForm({
        name: "",
        description: "",
        title: "",
        program: "",
        html: "",
        css: "",
      });
      setModal({
        type: "success",
        message: "Template added/updated successfully!",
        visible: true,
      });
    } catch (err) {
      setModal({
        type: "error",
        message: err.response?.data?.message || "Failed to add template",
        visible: true,
      });
    }
  };

  return (
    <TemplateFormContainer>
      <FormHeader>
        <FormTitle>Add/Update Template</FormTitle>
        <FormSubtitle>Create or update credential templates for issuing certificates</FormSubtitle>
      </FormHeader>

      <StyledForm onSubmit={handleSubmit}>
        <FormSection>
          <FormRow>
            <FormGroup>
              <Label>Template Name</Label>
              <InputWrapper>
                <InputIcon>📄</InputIcon>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter template name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <InputWrapper>
                <InputIcon>📝</InputIcon>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter template description"
                  value={form.description}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Certificate Title</Label>
              <InputWrapper>
                <InputIcon>🏆</InputIcon>
                <Input
                  type="text"
                  name="title"
                  placeholder="Certificate Title (e.g. GRADE SHEET)"
                  value={form.title}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Program</Label>
              <InputWrapper>
                <InputIcon>🎓</InputIcon>
                <Input
                  type="text"
                  name="program"
                  placeholder="Program (e.g. B.E Degree Examinations)"
                  value={form.program}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
          </FormRow>

          <CodeSection>
            <CodeHeader>
              <CodeTitle>Template Code</CodeTitle>
              <CodeSubtitle>Define the HTML structure and CSS styling for your certificate template</CodeSubtitle>
            </CodeHeader>

            <CodeGroup>
              <CodeLabel>HTML (Handlebars)</CodeLabel>
              <CodeTextArea
                name="html"
                placeholder="Enter HTML template with Handlebars syntax..."
                value={form.html}
                onChange={handleChange}
                rows="8"
                required
              />
            </CodeGroup>

            <CodeGroup>
              <CodeLabel>CSS</CodeLabel>
              <CodeTextArea
                name="css"
                placeholder="Enter CSS styles for your template..."
                value={form.css}
                onChange={handleChange}
                rows="8"
              />
            </CodeGroup>
          </CodeSection>

          <FormActions>
            <SubmitButton type="submit">
              {modal.type === "loading" ? "Submitting..." : "Submit Template"}
            </SubmitButton>
          </FormActions>
        </FormSection>
      </StyledForm>

      {modal.visible && (
        <TemplateModalOverlay>
          <TemplateModal>
            <ModalHeader>
              <ModalIcon>
                {modal.type === "loading" ? (
                  <Spinner />
                ) : modal.type === "success" ? (
                  <SuccessIcon>✅</SuccessIcon>
                ) : (
                  <ErrorIcon>⚠️</ErrorIcon>
                )}
              </ModalIcon>
              <ModalTitle>
                {modal.type === "loading" ? "Processing..." :
                  modal.type === "success" ? "Success" : "Error"}
              </ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>{modal.message}</p>
            </ModalContent>
            {modal.type !== "loading" && (
              <ModalActions>
                <CloseButton onClick={() => setModal({ ...modal, visible: false })}>
                  Close
                </CloseButton>
              </ModalActions>
            )}
          </TemplateModal>
        </TemplateModalOverlay>
      )}
    </TemplateFormContainer>
  );
}

export default TemplateForm;
