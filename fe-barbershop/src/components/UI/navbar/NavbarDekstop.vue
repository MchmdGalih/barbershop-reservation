<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";
import { onMounted, onUnmounted, ref } from "vue";

defineProps<{ itemsMenu: any[] }>();
const emits = defineEmits(["handle-logout"]);

const isDropdownOpen = ref<boolean>(false);
const showNavbar = ref<boolean>(true);
const lastScrollY = ref<number>(0);
const store = useAuthStore();

const onHandleLogout = () => {
  emits("handle-logout");
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropDown = () => (isDropdownOpen.value = false);

const handleScrollShow = () => {
  const currentScrollPosition = window.scrollY;
  showNavbar.value =
    currentScrollPosition < lastScrollY.value || currentScrollPosition < 50;

  lastScrollY.value = currentScrollPosition;
  closeDropDown();
};

onMounted(() => {
  window.addEventListener("scroll", handleScrollShow);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollShow);
});
</script>

<template>
  <header
    class="lg:py-6 md:py-4 py-2 w-full flex justify-between px-6 lg:px-18 md:px-12 items-center fixed top-0 bg-transparent z-10 transition-transform duration-300 ease-in-out"
    :class="{ '-translate-y-full ': !showNavbar }"
  >
    <div class="h-14 w-fit">
      <RouterLink to="/"
        ><img
          src="../../../assets/images/brand-barbershop.png"
          class="h-full object-contain rounded-md"
      /></RouterLink>
    </div>

    <nav class="block relative">
      <ul class="flex items-center gap-8 space-x-2">
        <li v-for="(item, idx) in itemsMenu" :key="idx">
          <a :href="item.url" v-if="!item.children">{{ item.name }}</a>
          <div v-else>
            <span
              class="flex items-center cursor-pointer"
              @click="toggleDropdown"
            >
              <button class="p-2 rounded-sm">
                {{ item.name }}
              </button>

              <Icon
                icon="mdi-arrow-down-drop"
                class="transition-transform duration-100 ease-in-out"
                :class="isDropdownOpen ? 'rotate-180' : 'rotate-0'"
              />
            </span>
            <div
              v-if="isDropdownOpen"
              class="border-2 border-light-beige bg-dark w-full rounded-md absolute mt-2 gap-y-2 px-4 py-2 z-10"
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

    <div class="flex gap-8 items-center">
      <template v-if="!store.isAuthenticated">
        <RouterLink
          to="/sign-in"
          class="px-4 py-2 btn-custom rounded-md hover:text-dark"
          >Login</RouterLink
        >
        <RouterLink to="/register" class="cursor-pointer">Register</RouterLink>
      </template>

      <button @click="onHandleLogout" class="cursor-pointer" v-else>
        Logout
      </button>
    </div>
  </header>
</template>
