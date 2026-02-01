<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import defaultLayout from "@/layouts/default.vue";
const route = useRoute();

const layouts = {
  default: defaultLayout,
  admin: "admin-layout",
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
