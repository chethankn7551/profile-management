import React, { useState } from "react";
import { useProfileContext } from "../context/ProfileContext";
import { saveProfile, updateProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ProfileForm: React.FC = () => {
  const { profile, setProfile } = useProfileContext();
  const [name, setName] = useState(profile?.name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [age, setAge] = useState(profile?.age ? String(profile.age) : "");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid Email Format");
      return;
    }

    const profileData = {
      ...profile,
      name,
      email,
      age: age ? parseInt(age, 10) : undefined,
    };

    try {
      if (profile) {
        await updateProfile(profileData);
      } else {
        const response = await saveProfile(profileData);
        profileData.id = response.data.id;
      }
      setProfile(profileData);
      localStorage.setItem("profile", JSON.stringify(profileData));
      navigate(`/profile/${profileData.id}`);
    } catch (error) {
      setError("Failed to save Profile");
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form-container-form">
        <h2 className="profile-form-container-form-title">
          {profile ? "Edit Profile" : "Create Profile"}
        </h2>
        <div className="profile-form-container-form-details">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Age (Optional)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        {error && (
          <p className="profile-form-container-form-details-error">{error}</p>
        )}
        <div className="profile-form-container-form-details-save">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
