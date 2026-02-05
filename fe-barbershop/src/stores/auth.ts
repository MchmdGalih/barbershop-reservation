import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "" as string | null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async login(payload: any) {
      this.isLoading = true;
      this.error = null;
      try {
        const { data } = await api.post("/auth/login", payload);
        this.token = data.data.token;
        this.isAuthenticated = true;

        return {
          success: true,
          mesagee: data.message,
        };
      } catch (error: any) {
        const message = error.response?.data?.message;
        this.error = message || "Login Failed";

        return { success: false, message };
      } finally {
        this.isLoading = false;
      }
    },

    async register(payload: any) {
      this.isLoading = true;
      this.error = null;
      try {
        const { data } = await api.post("/auth/register", payload);

        return {
          success: true,
          message: data.message,
        };
      } catch (error: any) {
        const message = error.response?.data?.message;
        this.error = message || "Registration Failed";

        return {
          success: false,
          message,
        };
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.token = null;
      this.isAuthenticated = false;
    },
  },
  persist: {
    pick: ["token", "isAuthenticated"],
  },
});
