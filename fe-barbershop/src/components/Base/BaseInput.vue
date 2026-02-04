<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  label?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  errorMessage?: string;
}

const props = defineProps<Props>();
const model = defineModel<string | number>({ required: true });
const showPassword = ref<boolean>(false);
const isPassword = computed(() => props.type === "password");

const inputType = computed(() => {
  if (!isPassword.value) return props.type;
  return showPassword.value ? "text" : "password";
});
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div class="space-y-2">
    <label class="leading-none text-sm font-medium" for="username">{{
      label
    }}</label>
    <div class="w-full relative mt-2">
      <input
        :type="inputType"
        :name="name"
        class="h-10 w-full border rounded-md px-3 py-2 text-base"
        :placeholder="placeholder"
        :class="{ 'pr-10': isPassword }"
        v-model="model"
      />

      <button
        v-if="isPassword"
        @click="togglePassword"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
      >
        <Icon icon="material-symbols:visibility" v-if="showPassword" />
        <Icon icon="material-symbols:visibility-off" v-else />
      </button>
    </div>

    <small v-if="errorMessage" class="text-red-600 text-sm">{{
      errorMessage
    }}</small>
  </div>
</template>
