<script setup lang="ts">
import { ref } from "vue";
import Burger from "@/components/UI/button/Burger.vue";
import { useAuthStore } from "@/stores/auth";
defineProps<{ itemsMenu: any[] }>();
const emits = defineEmits(["handle-logout"]);
const store = useAuthStore();
const isOpen = ref<boolean>(false);
const onHandleLogout = () => {
  emits("handle-logout");
};

const onOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div
    class="fixed w-full z-50"
    :class="[isOpen ? 'bg-dark' : 'bg-transparent']"
  >
    <header class="py-4 px-6 h-14 flex justify-between items-center w-full">
      <RouterLink to="/">
        <img
          src="../../../assets/images/brand-barbershop.png"
          class="h-12 object-contain rounded-md"
      /></RouterLink>

      <Burger @on-open="onOpen" :isOpen="isOpen" />
    </header>

    <div
      class="overflow-hidden bg-dark transition-all duration-300 ease-in-out"
      :class="[isOpen ? 'h-screen' : 'h-0']"
    >
      <nav class="flex-1 px-6 py-6 flex flex-col justify-between">
        <ul class="flex flex-col gap-6 mb-2">
          <li
            v-for="(item, idx) in itemsMenu"
            :key="idx"
            class="py-2 px-2 border-2 btn-custom hover:text-dark"
          >
            <a :href="item.url" v-if="!item.children" class="font-mona">{{
              item.name
            }}</a>
            <div v-else>
              <button class="cursor-pointer rounded-sm">
                {{ item.name }}
              </button>
            </div>
          </li>
        </ul>

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
      </nav>
    </div>
  </div>
</template>
