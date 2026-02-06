<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import NavbarDekstop from "./NavbarDekstop.vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import NavbarMobile from "./NavbarMobile.vue";
import { useWindowSize } from "@/composable/useWindowSize";
const store = useAuthStore();
const router = useRouter();
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

const { isMobile } = useWindowSize();
const handleLogout = () => {
  store.logout();
  toast.success("Logout successfully.", {
    onClose: () => router.push("/sign-in"),
  });
};
</script>

<template>
  <NavbarDekstop
    :itemsMenu="itemsMenu"
    @handle-logout="handleLogout"
    v-if="!isMobile"
  />
  <NavbarMobile :itemsMenu="itemsMenu" @handle-logout="handleLogout" v-else />
</template>
