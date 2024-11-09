import { useEffect } from "react";
import { useProfileContext } from "../context/ProfileContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProfile, getProfile } from "../api/profileApi";

const ProfileDisplay = () => {
  const { profile, setProfile } = useProfileContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = localStorage.getItem("profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        try {
          const response = await getProfile(id!);
          setProfile(response.data);
        } catch (error) {
          console.error("Profile not found");
        }
      }
    };
    if (id) loadProfile();
  }, [id, setProfile]);

  const handleDelete = async () => {
    try {
      await deleteProfile(id!);
      localStorage.removeItem("profile");
      setProfile(null);
      navigate("/profile-form");
    } catch (error) {
      console.log("Failed to delete Profile");
    }
  };

  if (!profile) {
    return (
      <div className="profile-display-container">
        <div className="no-profile">
          <p>
            No Profile Found. <a href="/profile-form">Create one</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-display-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-name">Name: {profile?.name}</h2>
          <h3 className="profile-email">Email: {profile?.email}</h3>
          {profile?.age && <div className="profile-age">{profile.age}</div>}
        </div>
      </div>
      <div className="button-group">
        <button onClick={() => handleDelete()} className="button edit-button">
          Delete Profile
        </button>
        <button
          onClick={() => navigate("/profile-form")}
          className="button edit-button"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileDisplay;
