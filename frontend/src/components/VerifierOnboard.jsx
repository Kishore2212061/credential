import React, { useState, useEffect } from "react";
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
  ModalContent
} from "./VerifierOnboard.styles";

function VerifierOnboard() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    expiryHours: 24,
    students: [],
  });
  const [users, setUsers] = useState([]);
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
      // prepare payload to match schema
      const payload = {
        companyName: formData.companyName,
        companyEmail: formData.email, // matches schema
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
    } catch (err) {
      setError(err.response?.data?.message || "Failed to invite verifier");
    } finally {
      setLoading(false);
    }
  };

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
          <Label>Select Students</Label>
          <div>
            {users.length > 0 ? (
              users.map((u) => (
                <label key={u._id} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={formData.students.includes(u._id)}
                    onChange={() => handleStudentSelect(u._id)}
                  />{" "}
                  {u.email}
                </label>
              ))
            ) : (
              <p>No users found</p>
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
