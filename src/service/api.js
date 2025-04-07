// src/services/api.js
import axios from "axios";
import { toast } from "react-toastify";

// Define your API base URL (from environment variables)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// List of endpoints that don't require authentication
const NO_AUTH_ENDPOINTS = ["/auth/login", "/auth/signup"];

const checkForExpiredToken = (token) => {
  // Basic validation first

  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    console.error("Invalid token format");
    return true; // Treat invalid tokens as expired
  }

  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const formattedToken = JSON.parse(decodedPayload);

    if (!formattedToken.exp) {
      console.error("Token missing expiration");
      return true;
    }

    const expiryDate = new Date(formattedToken.exp * 1000);
    return expiryDate < new Date();
  } catch (error) {
    console.error("Error parsing token:", error);
    return true; // Treat parsing errors as expired
  }
};

// Add request interceptor to inject auth token
api.interceptors.request.use(
  (config) => {
    // Skip auth check for endpoints that don't require it
    if (NO_AUTH_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint))) {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const isTokenExpired = checkForExpiredToken(token);
        if (isTokenExpired) {
          toast.error("Token Expired, login again");
          window.location.href = "/logout";
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Token validation error:", error);
        // Handle invalid token (e.g., clear it)
        localStorage.removeItem("token");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("unauthorised, login again");
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

// API methods
export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/signup", userData),
};

export const userService = {
  getAll: () => api.get("/users"),
  update: (id, data) => api.patch(`/users/${id}`, data),
};

export const getService = (url) => api.get(url);

export const downloadService = {
  downloadFile: async (url, filename) => {
    try {
      // Note we're using axios directly with responseType: 'blob'
      const response = await axios({
        url: `${API_BASE_URL}${url}`,
        method: 'GET',
        responseType: 'blob', // Important for binary data
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Create a temporary anchor element to trigger download
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', filename || 'download'); // Default filename if not provided
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }};

export default api;
