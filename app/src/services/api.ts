import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const weights = {
  getAll: async () => {
    const response = await api.get("/weights");
    return response.data.map((weight: any) => ({
      date: weight.date,
      weight: weight.value,
    }));
  },
  create: async (value: number, date: string) => {
    const response = await api.post("/weights", { value, date });
    return {
      date: response.data.date,
      weight: response.data.value,
    };
  },
};

export { api };
