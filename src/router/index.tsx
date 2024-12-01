import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import AboutPage from "@/pages/About/AboutPage";
import Manual from "@/pages/Auth/Manual/Manual";

import VacancyPage from "@/pages/Vacancy/VacancyPage";
import RegisterCredentialsPage from "@/pages/Auth/RegisterCredentialsPage";
import EmployeLogin from "@/pages/Auth/Employe/Login";
import ContactDetails from "@/pages/Auth/Form/ContactDetails";
import ContactByDia from "@/pages/Auth/Form/ContactByDia";
import VacancyDetails from "@/pages/Vacancy/VacancyDetails";

import GenerateResume from "@/pages/Resume/generate-resume";
export const AppRoutes = () => {
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-employee" element={<RegisterCredentialsPage />} />
      <Route path="/register/manual" element={<Manual />} />
      <Route path="/login-employer" element={<EmployeLogin />} />
      <Route path="/contact-details" element={<ContactDetails />} />
      <Route path="/register-by-dia" element={<ContactByDia />} />
      <Route path="/resume" element={<GenerateResume />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/vacancy" element={<VacancyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
      <Route path="/vacancy/:id" element={<VacancyDetails />} />
    </Routes>
  );
};
