import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: `http://d8kscscooggc4gwo8co8k0o4.198.12.77.132.sslip.io/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility functions for API calls
const get = async (url: string, params = {}) => {
  try {
    const response = await api.get(url, { params });
    console.log(`GET ${url} succeeded:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`GET ${url} failed:`, error);
    throw error;
  }
};

const post = async (url: string, data = {}) => {
  try {
    const response = await api.post(url, data);
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
  },
  position: {
    getAll: () => get("/position"),
    getSkillsById: (id: string | number) => get(`/position/${id}/skills`),
  },
  auth: {
    refresh: (data: { refreshToken: string }) => patch("/auth/refresh", data),
    login: (credentials: { email: string; password: string; rememberMe: boolean }) =>
      post("/auth/login", credentials),
    register: (data: { email: string; password: string }) =>
      post("/auth/register", data),
    logout: () => post("/auth/logout"),
  },
  vacancyParser: {
    start: () => get("/vacancy-parser"),
  },
};

export default apiEndpoints;
