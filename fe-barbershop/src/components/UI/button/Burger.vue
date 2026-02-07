<script setup lang="ts">
defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["on-open"]);
</script>

<template>
  <div
    @click="emit('on-open')"
    class="relative w-8 h-8 flex flex-col justify-center items-center gap-y-1 cursor-pointer transition-all duration-300 ease-in-out"
  >
    <span
      class="w-full h-1 border-2"
      :class="{ 'rotate-45 translate-y-2': isOpen }"
    ></span>
    <span class="w-full h-1 border-2" :class="{ 'opacity-0': isOpen }"></span>
    <span
      class="w-full h-1 border-2"
      :class="{ '-rotate-45 -translate-y-2': isOpen }"
    ></span>
  </div>
</template>
