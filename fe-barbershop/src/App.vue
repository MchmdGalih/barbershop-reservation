<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import defaultLayout from "@/layouts/default.vue";
import adminLayout from "@/layouts/adminLayout.vue";
const route = useRoute();

const layouts = {
  admin: "admin-layout",
  authL: "auth-layout",
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
