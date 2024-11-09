import axios from "axios";

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL_PROD;

export type ProfileData = {
  id?: string;
  name: string;
  email: string;
  age?: number;
};

export const saveProfile = (profileData: ProfileData) => {
  const saveData = axios.post(`${baseUrl}/profile`, profileData);
  return saveData;
};

export const updateProfile = (profileData: ProfileData) => {
  const updateData = axios.put(
    `${baseUrl}/profile/${profileData.id}`,
    profileData
  );
  return updateData;
};

export const getProfile = (id: string) => {
  const getData = axios.get(`${baseUrl}/profile/${id}`);
  return getData;
};

export const deleteProfile = (id: string) => {
  const deleteData = axios.delete(`${baseUrl}/profile/${id}`);
  return deleteData;
};
