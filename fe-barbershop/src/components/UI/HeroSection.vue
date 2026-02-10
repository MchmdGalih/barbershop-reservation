<script setup lang="ts">
import { useWindowSize } from "@/composable/useWindowSize";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const display = ref("");

const animationRevealText = () => {
  let iterator = 0;
  const target = "TRIM REPAIR";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const { isMobile } = useWindowSize();

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
  <div class="md:min-h-screen min-h-[50vh]">
    <section class="grid md:grid-cols-2 grid-cols-1 min-h-screen">
      <div
        class="w-full h-full flex justify-center items-center md:px-14 bg-[url('/src/assets/images/bg-hero-left.jpg')] bg-center bg-cover bg-no-repeat grayscale-50 mask-b-from-70% mask-b-to-100%"
      >
        <div
          class="md:max-w-full max-w-md text-center md:text-start flex flex-col gap-4"
        >
          <h1
            class="lg:text-6xl md:text-5xl text-3xl font-playfair text-light-beige"
          >
            Become the best version of yourself
          </h1>
          <small
            class="md:max-w-3/4 w-full lg:text-base md:text-sm text-xs line-clamp-3 font-playfair font-bold text-light-beige"
          >
            More than a new haircut. This is your best haircut because we know
            how to make you look better. Entrust your hair to professionals who
            are passionate about the culture of barbering.
          </small>

          <button
            class="btn-custom p-4 md:max-w-max max-full inline-flex items-center gap-x-4 mt-4 hover:text-dark"
          >
            <span>Book Now</span>
            <Icon icon="material-symbols:arrow-right-alt-rounded" height="24" />
          </button>
        </div>
      </div>

      <div
        class="bg-[url('/src/assets/images/bg-hero-right.jpg')] bg-center bg-cover w-full h-full mask-y-from-70% mask-y-to-100% grayscale-100% hidden md:block"
      >
        <div class="w-full h-full flex justify-end items-end">
          <div class="w-full mb-20">
            <h2
              class="text-5xl text-center items-center font-playfair text-light-beige"
            >
              {{ display }}
            </h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
