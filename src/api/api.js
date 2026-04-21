import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || API_URL,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;