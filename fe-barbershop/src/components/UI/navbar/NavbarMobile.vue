<script setup lang="ts">
import { ref } from "vue";
import Burger from "@/components/UI/button/Burger.vue";
import { useAuthStore } from "@/stores/auth";
defineProps<{ itemsMenu: any[] }>();
const emits = defineEmits(["handle-logout"]);
const store = useAuthStore();

const isActive = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const onHandleLogout = () => {
  emits("handle-logout");
};

const onOpen = () => {
  isOpen.value = !isOpen.value;
};
const toggle = () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <div class="fixed w-full bg-dark z-50 flex flex-col">
    <section class="py-4 px-6 flex justify-between items-center">
      <div class="h-14 w-fit">
        <RouterLink to="/">
          <img
            src="../../../assets/images/brand-barbershop.png"
            class="h-full object-contain rounded-md"
        /></RouterLink>
      </div>

      <Burger @on-open="onOpen" :isOpen="isOpen" />
    </section>
    <section class="px-6" :class="[isOpen ? 'h-screen' : 'hidden ']">
      <nav class="py-4">
        <ul class="flex flex-col gap-6 mb-2">
          <li
            v-for="(item, idx) in itemsMenu"
            :key="idx"
            class="py-2 px-2 border-2 btn-custom hover:text-dark"
          >
            <RouterLink
              :to="item.url"
              v-if="!item.children"
              class="font-mona"
              >{{ item.name }}</RouterLink
            >
            <div v-else>
              <button @click="toggle" class="cursor-pointer rounded-sm">
                {{ item.name }}
              </button>
            </div>
          </li>
        </ul>
      </nav>

      <div class="flex flex-col gap-4">
        <template v-if="!store.isAuthenticated">
          <RouterLink
            to="/sign-in"
            class="btn-custom hover:text-dark py-2 px-2 font-mona w-full flex justify-center"
            >Login</RouterLink
          >
          <RouterLink
            to="/register"
            class="btn-custom px-2 py-2 hover:text-dark font-mona w-full flex justify-center"
            >Register</RouterLink
          >
        </template>

        <button @click="onHandleLogout" class="cursor-pointer" v-else>
          Logout
        </button>
      </div>
    </section>
  </div>
</template>
