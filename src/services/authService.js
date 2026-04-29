import api from "./api";

const authService = {
  async login({ email, password }) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  async register({ name, email, password }) {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  },

  async me() {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async forgotPassword({ email }) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  async resetPassword({ token, password }) {
    const response = await api.post("/auth/reset-password", { token, password });
    return response.data;
  },
};

export default authService;
