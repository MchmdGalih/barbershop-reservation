<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { toast } from "vue3-toastify";

const isActive = ref<boolean>(false);
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
        name: "Braga",
        url: "",
      },
      {
        name: "Melong Cabeleireiros",
        url: "",
      },
      {
        name: "Barreiros",
        url: "",
      },
    ],
  },
  {
    name: "Hair Artist",
    url: "",
  },
]);

const store = useAuthStore();

const handleLogout = () => {
  store.logout();
  toast.success("Logout successfully.", {
    onClose: () => window.location.reload(),
  });
};
const toggle = () => {
  isActive.value = !isActive.value;
};
</script>

<template>
  <header
    class="py-6 w-full flex justify-between px-6 lg:px-18 md:px-12 items-center sticky top-0 backdrop-blur-lg z-50"
  >
    <div class="font-bold text-4xl">Brand</div>

    <nav class="md:block hidden relative">
      <ul class="flex items-center gap-8 space-x-2">
        <li v-for="(item, idx) in itemsMenu" :key="idx">
          <RouterLink :to="item.url" v-if="!item.children">{{
            item.name
          }}</RouterLink>
          <div v-else>
            <button @click="toggle()" class="cursor-pointer p-2 rounded-sm">
              {{ item.name }}
            </button>
            <div
              v-if="isActive"
              class="border-2 border-light-beige bg-dark w-46 rounded-md absolute mt-2 gap-y-2 px-4 py-2 z-10"
            >
              <RouterLink
                v-for="(child, cidx) in item.children"
                :key="cidx"
                :to="child.url"
                class="block hover:bg-light-beige hover:text-dark p-2 rounded-sm"
              >
                {{ child.name }}
              </RouterLink>
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <div class="md:inline-flex hidden gap-8 items-center">
      <template v-if="!store.isAuthenticated">
        <RouterLink
          to="/sign-in"
          class="px-4 py-2 btn-custom rounded-md hover:text-dark"
          >Login</RouterLink
        >
        <RouterLink to="/register" class="cursor-pointer">Register</RouterLink>
      </template>

      <button @click="handleLogout" class="cursor-pointer" v-else>
        Logout
      </button>
    </div>
  </header>
</template>
