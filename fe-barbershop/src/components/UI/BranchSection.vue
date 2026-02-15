<script setup lang="ts">
import { ref, watch } from "vue";
import { useBranchStore } from "@/stores/branch";
import { storeToRefs } from "pinia";
const branchStore = useBranchStore();
const { branches } = storeToRefs(branchStore);

const selectedBranch = ref<null | any>(null);
const handleSelectedBranch = (value: any) => (selectedBranch.value = value);

watch(
  branches,
  (newValue) => {
    if (newValue.length && !selectedBranch.value) {
      selectedBranch.value = newValue[0];
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="w-full min-h-80">
    <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
      <div class="w-full flex flex-col justify-center gap-8 px-16 py-4">
        <div class="space-y-2">
          <span class="text-base">Our</span>
          <h1 class="text-6xl">BRANCH</h1>
        </div>

        <div class="flex flex-col gap-4">
          <h3
            class="lg:text-xl 2xl:text-2xl xl:text-xl text-lg font-medium tracking-widest font-playfair"
          >
            TRIM REAPER
          </h3>
          <h1 class="text-5xl font-bold">
            {{ selectedBranch?.name.toUpperCase() }}
          </h1>
          <p class="text-xl tracking-wide">{{ selectedBranch?.address }}</p>
        </div>

        <div class="flex items-center gap-4">
          <button class="btn-custom p-4 font-bold">Book Now</button>
          <RouterLink
            :to="`/branch/${selectedBranch?.id}`"
            class="btn-custom p-4"
            >View Branch</RouterLink
          >
        </div>

        <div class="space-y-4">
          <h4 class="font-bold">Our Branches</h4>
          <ul class="flex items-center gap-6 flex-wrap">
            <li v-for="branch in branches" :key="branch.id">
              <button
                @click="handleSelectedBranch(branch)"
                :class="
                  branch.id === selectedBranch?.id
                    ? 'bg-quaternary text-dark'
                    : ''
                "
                class="p-2 text-base font-bold border border-quaternary rounded-md"
              >
                {{ branch.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="overflow-hidden px-2">
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="branch in selectedBranch?.barber"
            :key="branch.id"
            class="h-80 w-full"
          >
            <img
              :src="branch.image"
              alt="barber"
              class="w-full h-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
