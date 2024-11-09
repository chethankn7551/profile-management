import React from "react";
import "./App.css";
import { ProfileProvider } from "./context/ProfileContext";
import AppRoutes from "./components/Routes";

const App: React.FC = () => {
  return (
    <ProfileProvider>
      <AppRoutes />
    </ProfileProvider>
  );
};

export default App;
