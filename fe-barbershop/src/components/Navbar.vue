<template>
  <header
    class="bg-white text-black py-6 w-full flex justify-between px-18 max-sm:px-4 items-center border-gray-200 border-b-2"
  >
    <div class="font-bold text-4xl">Brand</div>
    <nav class="max-sm:hidden relative">
      <ul class="flex items-center gap-x-8">
        <li><a href="">Home</a></li>
        <li>
          <a href="">About Us</a>
        </li>
        <li class="group">
          <button @click="toggle" class="cursor-pointer">Branch</button>
          <div
            v-if="active"
            class="border-2 border-gray-300 w-46 rounded-md absolute mt-2 gap-y-2 px-4 py-2"
            :class="[active ? 'block' : 'hidden']"
          >
            <a href="" class="block">Bandung</a>
            <a href="" class="block">Jakarta</a>
            <a href="" class="block">Surabaya</a>
          </div>
        </li>
        <li><a href="">Hair Artist</a></li>
      </ul>
    </nav>

    <div class="flex items-center gap-x-8 max-sm:hidden">
      <button class="cursor-pointer">Login</button>
      <button class="cursor-pointer">Register</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);

const toggle = () => {
  active.value = !active.value;
};
</script>
