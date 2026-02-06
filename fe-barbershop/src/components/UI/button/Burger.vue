<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>



<template>
  <div
    class="relative w-8 h-8 flex flex-col justify-center items-center gap-y-1 cursor-pointer"
  >
    <span class="w-full h-1 border-2 transform"></span>
    <span class="w-full h-1 border-2"></span>
    <span class="w-full h-1 border-2"></span>
  </div>
</template>
