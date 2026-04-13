<script lang="ts"></script>

<template>
  <div class="w-full h-screen text-center flex justify-center items-center">
    <div class="flex flex-col items-center gap-4 max-w-[600px]">
      <p>404 Not found</p>
      <h1 class="text-4xl mt-2">Oops! Page Not Found</h1>
      <p class="text-lg">
        The page you are looking for doesn't exist. Click button below to go the
        homepage.
      </p>

      <RouterLink
        to="/"
        class="btn-custom p-4 mt-2 rounded-md max-w-max md:text-xl text-xs font-bold"
        >Back to Homepage</RouterLink
      >
    </div>
  </div>
</template>
