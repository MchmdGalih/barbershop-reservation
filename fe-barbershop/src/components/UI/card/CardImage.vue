<script setup lang="ts">
interface BranchPropsImage {
  image: string;
}

const props = defineProps<BranchPropsImage>();
</script>

<template>
  <div class="w-full h-auto overflow-hidden rounded-xl">
    <img
      :src="props.image"
      alt="barber"
      class="w-full h-full object-cover object-center rounded-md"
    />
  </div>
</template>
