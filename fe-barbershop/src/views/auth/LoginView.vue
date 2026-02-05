<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import FormAuth from "@/components/Form/FormAuth.vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
const router = useRouter();
const store = useAuthStore();

const handleSubmit = async (payload: any) => {
  const response = await store.login(payload);

  if (!response?.success) {
    toast.error(response?.message || "Login failed.");
    return;
  }

  toast.success(response.message, {
    onClose: () => router.push({ name: "home" }),
  });
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
