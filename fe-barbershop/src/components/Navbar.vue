<template>
  <header
    class="bg-white text-black py-6 w-full flex justify-between px-6 md:px-18 items-center border-gray-200 border-b-2"
  >
    <div class="font-bold text-4xl">Brand</div>
    <nav class="md:block hidden relative">
      <ul class="flex items-center gap-8 space-x-2">
        <li v-for="(item, idx) in itemsMenu" :key="idx">
          <RouterLink :to="item.url" v-if="!item.children">{{
            item.name
          }}</RouterLink>
          <div v-else>
            <button
              @click="toggle()"
              class="cursor-pointer p-2 rounded-sm hover:bg-gray-200"
            >
              {{ item.name }}
            </button>
            <div
              v-if="isActive"
              class="border-2 border-gray-300 w-46 rounded-md absolute mt-2 gap-y-2 px-4 py-2 z-10 bg-white"
            >
              <RouterLink
                v-for="(child, cidx) in item.children"
                :key="cidx"
                :to="child.url"
                class="block hover:bg-gray-200 p-2 rounded-sm"
              >
                {{ child.name }}
              </RouterLink>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <div class="md:inline-flex hidden gap-8">
      <button class="cursor-pointer">Login</button>
      <button class="cursor-pointer">Register</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isActive = ref(null);
const itemsMenu = ref([
  {
    name: "Home",
    url: "",
  },
  {
    name: "About Us",
    url: "",
  },
  {
    name: "Branch",
    url: "",
    children: [
      {
        name: "Bandung",
        url: "",
      },
      {
        name: "Jakarta",
        url: "",
      },
      {
        name: "Surabaya",
        url: "",
      },
    ],
  },
  {
    name: "Hair Artist",
    url: "",
  },
]);

const toggle = () => {
  isActive.value = !isActive.value;
};
</script>
