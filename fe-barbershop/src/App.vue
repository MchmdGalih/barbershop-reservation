<script setup lang="ts">
import { computed, type Component } from "vue";
import { RouterView, useRoute } from "vue-router";
import defaultLayout from "@/layouts/default.vue";
import adminLayout from "@/layouts/adminLayout.vue";
import authLayout from "@/layouts/authLayout.vue";
const route = useRoute();

type LayoutKey = "admin" | "auth" | "default";

const layouts: Record<LayoutKey, Component> = {
  admin: adminLayout,
  auth: authLayout,
  default: defaultLayout,
};

const layoutDisplay = computed(() => {
  const layout = route.meta.layout as LayoutKey;
  return layout ? layouts[layout] : layouts.default;
});
</script>

<template>
  <component :is="layoutDisplay">
    <RouterView />
  </component>
</template>
