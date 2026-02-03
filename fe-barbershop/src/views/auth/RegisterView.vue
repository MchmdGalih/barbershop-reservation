<template>
  <div class="w-full p-4 md:p-6 space-y-4">
    <form>
      <div class="flex flex-col gap-6">
        <section class="flex flex-col">
          <h1 class="text-4xl font-bold">Register</h1>
          <p class="text-2xl font-light">
            Please fill in the form below to create account
          </p>
        </section>
        <div class="space-y-2">
          <label class="leading-none text-sm font-medium" for="username"
            >Username</label
          >
          <div class="w-full relative mt-2">
            <input
              type="text"
              name="username"
              class="h-10 w-full border rounded-md px-3 py-2 text-base"
              placeholder="zoldick"
            />
          </div>
        </div>
        <div class="space-y-2">
          <label class="leading-none text-sm font-medium" for="email"
            >Email</label
          >
          <div class="w-full relative mt-2">
            <input
              type="email"
              name="email"
              class="h-10 w-full border rounded-md px-3 py-2 text-base"
              placeholder="zoldick18@gmail.com"
            />
          </div>
        </div>
        <div class="space-y-2">
          <label class="leading-none text-sm font-medium" for="password"
            >Password</label
          >
          <div class="w-full relative mt-2">
            <input
              type="password"
              name="password"
              class="h-10 w-full border rounded-md px-3 py-2 text-base"
              placeholder="*******"
            />
          </div>
        </div>
        <div class="space-y-2">
          <div class="w-full relative">
            <button
              class="inline-flex w-full gap-2 bg-blue-600 text-base text-white rounded-md py-2 cursor-pointer justify-center items-center"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-center text-sm font-light">
            Already have account?
            <RouterLink
              to="/login"
              class="text-blue-700 underline cursor-pointer"
              >Sign In</RouterLink
            >
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts"></script>
