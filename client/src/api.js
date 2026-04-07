import axios from "axios";

// In development this falls back to localhost.
// In production, Render injects VITE_API_URL at build time.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Before every request, attach the JWT token from localStorage if one exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
