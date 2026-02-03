<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import defaultLayout from "@/layouts/default.vue";
import adminLayout from "@/layouts/adminLayout.vue";
import authLayout from "@/layouts/authLayout.vue";
const route = useRoute();

const layouts = {
  admin: adminLayout,
  auth: authLayout,
  default: defaultLayout,
};

const layoutDisplay = computed(() => {
  const layout = route.meta.layout as string;
  return layouts[layout] || defaultLayout;
});
</script>

<template>
  <component :is="layoutDisplay">
    <RouterView />
  </component>
</template>
