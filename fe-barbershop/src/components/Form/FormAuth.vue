<script setup lang="ts">
import { computed, Prop, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email, minLength } from "@vuelidate/validators";
import BaseInput from "@/components/Base/BaseInput.vue";
import { useAuthStore } from "@/stores/auth";
const store = useAuthStore();

const isRegister = computed(() => props.mode === "register");
const isLoading = computed(() => store.isLoading);

interface Props {
  mode: "login" | "register";
  title: string;
  subtitle: string;
}

const emit = defineEmits(["submit"]);
const props = defineProps<Props>();

const form = reactive({
  username: "",
  email: "",
  password: "",
});

const rules = computed(() => {
  if (isRegister.value) {
    return {
      username: {
        required: helpers.withMessage("Username is required", required),
      },
      email: {
        required: helpers.withMessage("Email is required", required),
        email,
      },
      password: {
        required: helpers.withMessage("Password is required", required),
        minLength: helpers.withMessage(
          "Password must be at least 6 characters",
          minLength(6),
        ),
      },
    };
  }

  return {
    email: {
      required: helpers.withMessage("Email is required", required),
      email,
    },
    password: {
      required: helpers.withMessage("Password is required", required),
      minLength: helpers.withMessage(
        "Password must be at least 6 characters",
        minLength(6),
      ),
    },
  };
});

const v$ = useVuelidate(rules, form);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) return;

  emit("submit", {
    username: isRegister.value ? form.username : undefined,
    email: form.email,
    password: form.password,
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-6">
      <section class="flex flex-col">
        <h1 class="text-4xl font-bold">{{ props.title }}</h1>
        <p class="text-2xl font-light">
          {{ props.subtitle }}
        </p>
      </section>
      <BaseInput
        v-model="form.username"
        v-if="isRegister"
        label="Username"
        name="username"
        type="text"
        placeholder="zoldick"
        :errorMessage="v$.username.$errors[0]?.$message"
      />
      <BaseInput
        v-model="form.email"
        label="Email"
        name="email"
        type="email"
        placeholder="zoldick18@gmail.com"
        :errorMessage="v$.email.$errors[0]?.$message"
      />
      <BaseInput
        v-model="form.password"
        label="Password"
        name="password"
        type="password"
        placeholder="*********"
        :errorMessage="v$.password.$errors[0]?.$message"
      />
      <div class="space-y-2">
        <div class="w-full relative">
          <button
            class="inline-flex w-full gap-2 bg-dark border border-light-beige text-base text-white rounded-md py-2 cursor-pointer justify-center items-center"
            type="submit"
            :disabled="isLoading"
          >
            <p v-if="isLoading">loading..</p>
            <span v-else>{{ isRegister ? "Register" : "Sign In" }}</span>
          </button>
        </div>
      </div>
      <div class="space-y-2">
        <p class="text-center text-sm font-light">
          {{
            isRegister ? "Already have an account?" : "Don't have an account?"
          }}
          <RouterLink
            :to="isRegister ? '/sign-in' : '/register'"
            class="text-blue-700 underline cursor-pointer"
            >{{ isRegister ? "Sign In" : "Register" }}</RouterLink
          >
        </p>
      </div>
    </div>
  </form>
</template>
