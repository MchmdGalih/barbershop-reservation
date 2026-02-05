<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
import FormAuth from "@/components/Form/FormAuth.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const store = useAuthStore();
const handleSubmit = async (payload: any) => {
  const response = await store.register(payload);

  if (!response?.success) {
    toast.error(response?.message || "Register failed.");
    return;
  }

  toast.success(response.message, {
    onClose: () => router.push({ name: "sign-in" }),
  });
};
</script>

<template>
  <div class="w-full p-4 md:p-6 space-y-4">
    <FormAuth
      mode="register"
      title="Register"
      subtitle="Please fill in the form below to create an account."
      @submit="handleSubmit"
    />
  </div>
</template>
