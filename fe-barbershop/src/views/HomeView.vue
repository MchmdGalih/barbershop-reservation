<script setup lang="ts">
import AboutSection from "@/components/UI/AboutSection.vue";
import BranchSection from "@/components/UI/BranchSection.vue";
import HeroSection from "@/components/UI/HeroSection.vue";

</script>

<template>
  <HeroSection />
  <AboutSection />
  <BranchSection :branches="branches" />
</template>
