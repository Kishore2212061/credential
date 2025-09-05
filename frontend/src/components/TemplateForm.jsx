import React, { useState } from "react";
import { api } from "../utils/api";
import {
  TemplateFormContainer,
  TemplateForm as StyledForm,
  FormRow,
  FormGroup,
  Label,
  Input,
  TextArea,
  CodeSection,
  CodeGroup,
  CodeTextArea,
  SubmitButton,
  TemplateModalOverlay,
  TemplateModal,
  TemplateLoader,
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
      <h4>Add/Update Template</h4>

      <StyledForm onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label>Template Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Template Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label>Certificate Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Certificate Title (e.g. GRADE SHEET)"
              value={form.title}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Program</Label>
            <Input
              type="text"
              name="program"
              placeholder="Program (e.g. B.E Degree Examinations)"
              value={form.program}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <CodeSection>
          <CodeGroup>
            <label>HTML (Handlebars)</label>
            <CodeTextArea
              name="html"
              placeholder="HTML (Handlebars)"
              value={form.html}
              onChange={handleChange}
              rows="5"
              required
            />
          </CodeGroup>

          <CodeGroup>
            <label>CSS</label>
            <CodeTextArea
              name="css"
              placeholder="CSS"
              value={form.css}
              onChange={handleChange}
              rows="5"
            />
          </CodeGroup>
        </CodeSection>

        <SubmitButton type="submit">Submit Template</SubmitButton>
      </StyledForm>

      {modal.visible && (
        <TemplateModalOverlay>
          <TemplateModal className={modal.type}>
            {modal.type === "loading" && <TemplateLoader />}
            <p>{modal.message}</p>
            {modal.type !== "loading" && (
              <button onClick={() => setModal({ ...modal, visible: false })}>
                Close
              </button>
            )}
          </TemplateModal>
        </TemplateModalOverlay>
      )}
    </TemplateFormContainer>
  );
}

export default TemplateForm;
