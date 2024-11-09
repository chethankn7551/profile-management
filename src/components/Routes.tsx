import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import ProfileDisplay from "./ProfileDisplay";
import "./style.css";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace/>}/>
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/profile/:id" element={<ProfileDisplay />} />
        <Route path="/profile" element={<ProfileDisplay />} />
        <Route
          path="*"
          element={<div className="error-404">404 Not Found</div>}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
