<script setup lang="ts">
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
  <div class="w-full h-screen relative">
    <section
      class="grid md:grid-cols-2 grid-cols-1 h-full justify-center items-center"
    >
      <div
        class="w-full h-full flex justify-center items-center px-14 bg-[url('/src/assets/images/bg-hero-left.jpg')] bg-center bg-cover bg-no-repeat grayscale-50 mask-b-from-70% mask-b-to-100%"
      >
        <div class="max-w-full flex flex-col gap-4">
          <h1
            class="lg:text-5xl md:text-4xl text-2xl font-playfair text-light-beige"
          >
            Become the best version of yourself
          </h1>
          <small
            class="max-w-3/4 lg:text-base md:text-sm font-playfair font-bold text-light-beige"
          >
            More than a new haircut. This is your best haircut because we know
            how to make you look better. Entrust your hair to professionals who
            are passionate about the culture of barbering.
          </small>

          <button class="btn-custom p-4 max-w-max gap-x-4 mt-4 hover:text-dark">
            Book Now
            <Icon icon="material-symbols:arrow-right-alt-rounded" height="24" />
          </button>
        </div>
      </div>
      <div
        class="bg-[url('/src/assets/images/bg-hero-right.jpg')] bg-center bg-cover w-full h-full mask-y-from-70% mask-y-to-100% grayscale-100%"
      >
        <div class="w-full h-full flex justify-end items-end">
          <div class="w-full mb-20">
            <h1
              class="lg:text-7xl md:text-5xl text-4xl text-center items-center font-playfair text-light-beige"
            >
              {{ display }}
            </h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
