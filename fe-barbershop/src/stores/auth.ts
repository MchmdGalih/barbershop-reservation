import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as String | null,
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
        this.token = data.token;
        this.isAuthenticated = true;
        return data;
      } catch (error: any) {
        const message = error.response?.data?.message;
        this.error = message || "Login Failed";
      } finally {
        this.isLoading = false;
      }
    },

    async register(payload: any) {
      this.isLoading = true;
      this.error = null;
      try {
        const { data } = await api.post("/auth/register", payload);
        return data;
      } catch (error: any) {
        const message = error.response?.data?.message;
        this.error = message || "Registration Failed";
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
