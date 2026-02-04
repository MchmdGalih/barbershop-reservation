<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import FormAuth from "@/components/Form/FormAuth.vue";
import { toast } from "vue3-toastify";
const store = useAuthStore();

const handleSubmit = async (payload) => {
  try {
    const response = await store.login(payload);
    toast.success(response.message);
  } catch (error) {
    toast.error(error.message);
  }
};
</script>

<template>
  <div class="w-full p-4 md:p-6 space-y-4">
    <FormAuth
      mode="login"
      title="Sign In"
      subtitle="Please sign in to your account"
      @submit="handleSubmit"
    />
  </div>
</template>
