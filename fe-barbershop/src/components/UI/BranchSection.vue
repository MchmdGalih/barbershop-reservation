<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useBranchStore } from "@/stores/branch";
import { storeToRefs } from "pinia";
import CardImage from "./card/CardImage.vue";
const branchStore = useBranchStore();
const { branches } = storeToRefs(branchStore);

const selectedBranch = ref<null | any>(null);
const handleSelectedBranch = (value: any) => (selectedBranch.value = value);

const dataDuplicatedForImage = computed(() => {
  if (!selectedBranch.value?.barber) return [];

  return [...selectedBranch.value.barber, ...selectedBranch.value.barber];
});

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
  <div class="w-full min-h-full overflow-hidden">
    <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
      <div class="w-full flex flex-col justify-center gap-8 px-16 py-4">
        <div class="space-y-2">
          <span class="text-base">Our</span>
          <h1 class="md:text-6xl text-4xl font-bold">BRANCH</h1>
        </div>

        <div class="flex flex-col gap-4">
          <h3
            class="lg:text-xl 2xl:text-2xl xl:text-xl text-lg font-medium tracking-widest font-playfair"
          >
            TRIM REAPER
          </h3>
          <h1 class="lg:text-2xl 2xl:text-4xl text-xl font-bold">
            {{ selectedBranch?.name.toUpperCase() }}
          </h1>
          <p class="text-xl tracking-wide">{{ selectedBranch?.address }}</p>
        </div>

        <div class="flex items-center max-w-max flex-wrap gap-4">
          <button
            class="btn-custom p-4 rounded-md md:text-xl text-xs font-bold"
          >
            Book Now
          </button>
          <RouterLink
            :to="`/branch/${selectedBranch?.id}`"
            class="btn-custom p-4 rounded-md md:text-xl text-xs"
            >View Branch</RouterLink
          >
        </div>

        <div class="space-y-4">
          <h4 class="font-bold">Our Branches</h4>
          <ul class="flex items-center gap-6 flex-wrap">
            <li v-for="branch in branches" :key="branch?.id">
              <button
                @click="handleSelectedBranch(branch)"
                :class="
                  branch.id === selectedBranch?.id
                    ? 'bg-quaternary text-dark'
                    : ''
                "
                class="p-2 md:text-base text-sm font-bold border border-quaternary rounded-md"
              >
                {{ branch.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex w-full h-auto overflow-hidden gap-2.5">
        <div
          class="flex-1 overflow-hidden md:max-h-screen max-h-[60vh]"
          v-for="(_, colIdx) in 3"
          :key="colIdx"
        >
          <div
            class="flex flex-col gap-4 animations-scorll"
            :class="[
              colIdx % 2 === 0 ? 'animation-normal' : 'animation-reverse',
            ]"
          >
            <CardImage
              v-for="(barber, idx) in dataDuplicatedForImage"
              :key="`colIdx-${idx}`"
              :image="barber.image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animations-scorll {
  animation: scrolUp 24s linear infinite;
}

.animation-normal {
  animation-direction: normal;
}

.animation-reverse {
  animation-direction: reverse;
}

@keyframes scrolUp {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-50%);
  }
}
</style>
