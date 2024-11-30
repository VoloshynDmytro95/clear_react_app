import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "@/pages/Login/LoginPage";
import HomePage from "@/pages/Home/HomePage";
import AboutPage from "@/pages/About/AboutPage";

export const AppRoutes = () => {
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};
