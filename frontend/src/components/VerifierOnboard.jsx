import React, { useState, useEffect, useCallback } from "react";
import { api } from "../utils/api";
import {
  VerifierContainer,
  VerifierForm,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  Loader,
  Modal,
  ModalContent,
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
      <h4>Invite Verifier</h4>
      <VerifierForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Company Name</Label>
          <Input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Verifier Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter verifier email"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Expiry (hours)</Label>
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
        </FormGroup>

        <FormGroup>
          <Label>Search Students by Register No</Label>
          <Input
            type="text"
            placeholder="Search register no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </FormGroup>

        <FormGroup>
          <Label>Select Students</Label>
          <div style={{ maxHeight: "200px", overflowY: "auto", padding: "10px" }}>
            {searchQuery.length === 0 ? (
              <p style={{ color: "#999" }}>Start typing to search for students</p>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <label
                  key={u._id}
                  style={{
                    display: "block",
                    padding: "5px 0",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.students.includes(u._id)}
                    onChange={() => handleStudentSelect(u._id)}
                    style={{ marginRight: "10px" }}
                  />
                  {u.userDetail.registerNo}{" "}
                  {u.userDetail.name && `- ${u.userDetail.name}`}
                </label>
              ))
            ) : (
              <p style={{ color: "#999" }}>No matching users found</p>
            )}
          </div>
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Inviting..." : "Send Invite"}
        </SubmitButton>
      </VerifierForm>

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
    </VerifierContainer>
  );
}

export default VerifierOnboard;