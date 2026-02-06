import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: [],
  }),

  actions: {},
});
