import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  ProfileContainer,
  ProfileTitle,
  ProfileForm,
  Input,
  ProfileButton,
  ModalOverlay,
  Modal,
  Loader,
} from "./UserProfile.styles";

function UserProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <ProfileContainer>
      <ProfileTitle>My Profile</ProfileTitle>

      <ProfileForm onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={profile.name || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="degree"
          placeholder="Degree"
          value={profile.degree || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="branch"
          placeholder="Branch"
          value={profile.branch || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="mode"
          placeholder="Mode"
          value={profile.mode || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="registerNo"
          placeholder="Register No"
          value={profile.registerNo || ""}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="regulations"
          placeholder="Regulations"
          value={profile.regulations || ""}
          onChange={handleChange}
        />

        <ProfileButton type="submit">Update Profile</ProfileButton>
      </ProfileForm>

      {/* Loader Modal */}
      {loading && (
        <ModalOverlay>
          <Modal>
            <Loader />
            <p>Loading...</p>
          </Modal>
        </ModalOverlay>
      )}

      {/* Error Modal */}
      {error && (
        <ModalOverlay>
          <Modal className="error">
            <p>{error}</p>
            <button onClick={() => setError("")}>Close</button>
          </Modal>
        </ModalOverlay>
      )}

      {/* Success Modal */}
      {success && (
        <ModalOverlay>
          <Modal className="success">
            <p>{success}</p>
            <button onClick={() => setSuccess("")}>Close</button>
          </Modal>
        </ModalOverlay>
      )}
    </ProfileContainer>
  );
}

export default UserProfile;
