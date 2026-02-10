import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useBranchStore = defineStore("branch", {
  state: () => ({
    branch: [],
  }),

  actions: {
    async getAllBranch() {
      try {
        const { data } = await api.get("/outlet");
        this.branch = data.data;

        return {
          success: true,
          message: data.message,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
});
