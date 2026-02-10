<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import NavbarDekstop from "./NavbarDekstop.vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import NavbarMobile from "./NavbarMobile.vue";
import { useWindowSize } from "@/composable/useWindowSize";
import { useBranchStore } from "@/stores/branch";
const authStore = useAuthStore();
const branchStore = useBranchStore();
const router = useRouter();

const branches: any = computed(() => branchStore.branch);

const itemsMenu = computed(() => [
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
    children: branches.value.map((branch: any) => ({
      name: branch.name,
      url: `/branch/${branch.id}`,
    })),
  },
  {
    name: "Hair Artist",
    url: "",
  },
]);

const { isMobile } = useWindowSize();

const getDataBranch = async () => {
  const response = await branchStore.getAllBranch();
  if (!response?.success) {
    toast.error(response?.message);
  }
};
const handleLogout = () => {
  authStore.logout();
  toast.success("Logout successfully.", {
    onClose: () => router.push("/sign-in"),
  });
};

onMounted(() => {
  getDataBranch();
});
</script>

<template>
  <NavbarDekstop
    :itemsMenu="itemsMenu"
    @handle-logout="handleLogout"
    v-if="!isMobile"
  />
  <NavbarMobile :itemsMenu="itemsMenu" @handle-logout="handleLogout" v-else />
</template>
