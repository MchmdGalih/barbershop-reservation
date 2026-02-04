<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
import FormAuth from "@/components/Form/FormAuth.vue";

const store = useAuthStore();
const handleSubmit = async (payload: any) => {
  try {
    const response = await store.register(payload);
    console.log(response);
  } catch (error) {
    toast.error(error.message);
  }
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
