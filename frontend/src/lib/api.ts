import axios from "axios";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      toast({
        title: "Session Expired",
        description: "Please log in again.",
        variant: "destructive",
      });
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to perform this action.",
        variant: "destructive",
      });
    } else if (!error.response) {
      toast({
        title: "Network Error",
        description: "Unable to connect to the server.",
        variant: "destructive",
      });
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth APIs
export const authAPI = {
  register: (data: { email: string; password: string; role: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
};

// Task APIs
export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  owner_id?: number;
}

export const taskAPI = {
  getAll: () => api.get<Task[]>("/tasks"),
  create: (data: { title: string; description: string }) =>
    api.post("/tasks", data),
  update: (id: number, data: { title: string; description: string; status: string }) =>
    api.put(`/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/tasks/${id}`),
};