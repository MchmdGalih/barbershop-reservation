<script setup lang="ts">
import Navbar from "@/components/UI/navbar/Navbar.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
