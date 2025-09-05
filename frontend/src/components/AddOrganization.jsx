import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  AddOrgContainer,
  AddOrgForm,
  Input,
  SubmitButton,
  LoadingOverlay,
  Spinner,
  ModalOverlay,
  Modal,
  CloseButton,
} from "./AddOrganization.styles";

function AddOrganization({ onAdd, editOrg, clearEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      onAdd();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddOrgContainer>
      <h3>{editOrg ? "Edit Organization" : "Add Organization"}</h3>
      <AddOrgForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" disabled={loading}>
          {editOrg ? "Update Organization" : "Add Organization"}
        </SubmitButton>
      </AddOrgForm>

      {/* Loading */}
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}

      {/* Error Modal */}
      {error && (
        <ModalOverlay>
          <Modal>
            <h3>Error</h3>
            <p>{error}</p>
            <CloseButton onClick={() => setError("")}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}

      {/* Success Modal */}
      {success && (
        <ModalOverlay>
          <Modal className="success-modal">
            <h3>Success</h3>
            <p>{success}</p>
            <CloseButton onClick={() => setSuccess("")}>Close</CloseButton>
          </Modal>
        </ModalOverlay>
      )}
    </AddOrgContainer>
  );
}

export default AddOrganization;
