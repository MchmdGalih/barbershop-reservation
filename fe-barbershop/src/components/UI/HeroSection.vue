<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="h-[85vh] w-full relative">
    <section
      class="min-w-full h-full flex justify-center items-center section-bg-hero"
    >
      <div class="flex flex-col items-center gap-4">
        <h1 class="lg:text-8xl md:text-6xl text-4xl font-bold text-center">
          Find your <span class="text-light-beige">perfect</span>,
        </h1>
        <h1 class="lg:text-8xl md:text-6xl text-4xl font-bold text-center">
          <span class="text-light-beige">Haircut</span> for you.
        </h1>

        <button class="btn-custom p-4 gap-x-4 mt-4 hover:text-dark">
          Book Now
          <Icon icon="material-symbols:arrow-right-alt-rounded" height="24" />
        </button>
      </div>
    </section>
  </div>
</template>
