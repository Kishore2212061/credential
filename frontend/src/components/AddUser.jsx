import React, { useState } from "react";
import { api } from "../utils/api";
import {
  AddUserContainer,
  AddUserForm,
  Loader,
  Modal,
  ModalContent,
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <h4>Add User</h4>
      <AddUserForm onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Profile fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={form.degree}
          onChange={handleChange}
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mode"
          placeholder="Mode"
          value={form.mode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="registerNo"
          placeholder="Register No"
          value={form.registerNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="regulations"
          placeholder="Regulations"
          value={form.regulations}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          Add User
        </button>
      </AddUserForm>

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
    </AddUserContainer>
  );
}

export default AddUser;
