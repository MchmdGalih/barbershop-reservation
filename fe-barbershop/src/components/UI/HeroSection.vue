<script setup lang="ts">
import { useWindowSize } from "@/composable/useWindowSize";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const display = ref("");

const animationRevealText = () => {
  let iterator = 0;
  const target = "TRIM REPAIR";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const interval = setInterval(() => {
    display.value = target
      .split("")
      .map((_, index) => {
        if (index < iterator) return target[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iterator >= target.length) {
      clearInterval(interval);
      iterator = 0;
      setTimeout(animationRevealText, 2000);
    }
    iterator += 1 / 4;
  }, 30);
};

animationRevealText();
</script>

<template>
  <div
    id="hero"
    class="min-h-[90vh] flex justify-center items-center md:px-14 bg-[url('/src/assets/images/bg-hero-left.jpg')] bg-center bg-cover bg-no-repeat grayscale-50 mask-b-from-70% mask-b-to-100%"
  >
    <section
      class="text-center flex flex-col gap-4 items-center max-w-max mx-auto"
    >
      <h1 class="lg:text-6xl md:text-5xl text-4xl text-light-beige">
        {{ display }}
      </h1>
      <p
        class="max-w-2/4 lg:text-base md:text-sm text-xs line-clamp-3 font-playfair font-bold"
      >
        More than a new haircut. This is your best haircut because we know how
        to make you look better. Entrust your hair to professionals who are
        passionate about the culture of barbering.
      </p>

      <button
        class="btn-custom p-4 md:max-w-max max-full inline-flex items-center gap-x-4 mt-4 hover:text-dark"
      >
        <span>Book Now</span>
        <Icon
          icon="material-symbols:arrow-right-alt-rounded"
          width="24"
          height="24"
          class="animate-pulse"
        />
      </button>

      <div class="animate-bounce mt-2 block space-y-2">
        <Icon icon="mdi:mouse" class="w-6 h-6 mx-auto" />
        <p>Scroll to read our story.</p>
      </div>
    </section>
  </div>
</template>
