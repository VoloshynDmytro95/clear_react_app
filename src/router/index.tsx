import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import HomePage from "@/pages/Home/HomePage";
import AboutPage from "@/pages/About/AboutPage";
import Manual from "@/pages/Auth/Manual/Manual";
import VacancyPage from "@/pages/Vacancy/VacancyPage";
import RegisterCredentialsPage from "@/pages/Auth/RegisterCredentialsPage";

export const AppRoutes = () => {
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login-employer"
        element={<RegisterCredentialsPage />}
      />
      <Route path="/register/manual" element={<Manual />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vacancy" element={<VacancyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
};
