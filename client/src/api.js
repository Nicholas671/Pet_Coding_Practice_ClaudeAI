import axios from "axios";

// All API requests go to this base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
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
