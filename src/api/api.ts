import axios from "axios";
import {
  Position,
  SearchVacancyPayload,
  SearchVacancyResponse,
  Skill,
  Specialty,
  Vacancy,
} from "@/api/types";

// Base Axios instance
const api = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Utility functions for API calls
const get = async <T>(url: string, params = {}) => {
  try {
    const response = await api.get<T>(url, { params });
    return response.data;
  } catch (error) {
    console.error(`GET ${url} failed:`, error);
    throw error;
  }
};

const post = async <T>(url: string, data = {}): Promise<T> => {
  try {
    const response = await api.post<T>(url, data);
    console.log(`POST ${url} succeeded:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`POST ${url} failed:`, error);
    throw error;
  }
};

const patch = async (url: string, data = {}) => {
  try {
    const response = await api.patch(url, data);
    console.log(`PATCH ${url} succeeded:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`PATCH ${url} failed:`, error);
    throw error;
  }
};

// API Endpoints
const apiEndpoints = {
  user: {
    fillData: (data: Record<string, any>) => patch("/user/fill-data", data),
    saveCoreData: (data: Record<string, any>) =>
      patch("/user/save-core-data", { ...data.data }),
    saveSkills: (data: Record<string, any>) =>
      patch("/user/save-skills", { ...data.data }),
    saveExperienceData: (data: Record<string, any>) =>
      patch("/user/save-experience-data", { ...data.data }),
  },
  position: {
    getAll: () => get<Position[]>("/position"),
    getSkillsById: (id: string | number) =>
      get<Skill[]>(`/position/${id}/skills`),
  },
  auth: {
    refresh: () => patch("/auth/refresh"),
    login: (credentials: {
      email: string;
      password: string;
      rememberMe: boolean;
    }) => post("/auth/login", credentials),
    register: (data: { email: string; password: string }) =>
      post<{ status: boolean }>("/auth/register", data),
    logout: () => post("/auth/logout"),
  },
  specialty: {
    getAll: () => get<Specialty[]>("/specialty"),
  },
  vacancy: {
    getById: (id: string) => get<Vacancy>(`/vacancy/${id}`),
    search: (payload: SearchVacancyPayload) =>
      post<SearchVacancyResponse>("/vacancy/search", payload),
    apply: (id: string) => patch(`/vacancy/${id}/apply`),
  },
};

export default apiEndpoints;
