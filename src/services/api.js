import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

const resolveBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) return "http://localhost:3001/api";
  const trimmed = envUrl.replace(/\/$/, "");
  return /\/api$/i.test(trimmed) ? trimmed : `${trimmed}/api`;
};

const api = axios.create({
  baseURL: resolveBaseUrl(),
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("econagro:token") ||
        sessionStorage.getItem("econagro:token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (isDev) console.log(`→ ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if (isDev) console.log(`← ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject({ status: error.response?.status, message });
  },
);

export default api;
