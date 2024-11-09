import { createContext, ReactNode, useContext, useState } from "react";

type profileData = {
  id?: string;
  name: string;
  email: string;
  age?: number;
};

type profileContextType = {
  profile: profileData | null;
  setProfile: (profile: profileData | null) => void;
};

const ProfileContext = createContext<profileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<profileData | null>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useprofileContext must be used");
  return context;
};
