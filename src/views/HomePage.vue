<template>
  <div class="bg-dark-bg min-h-screen">
    <!-- Hero Section -->
    <div class="relative">
      <div class="w-full h-64 object-cover" />
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div
        class="absolute inset-0 flex items-center justify-center text-center text-white"
      >
        <h1 class="text-4xl font-bold">General's Handbook</h1>
      </div>
    </div>

    <!-- Introduction -->
    <div class="container mx-auto py-8 px-4 text-text-light">
      <h2 class="text-2xl mb-4">Welcome</h2>
      <p class="mb-6">
        Explore a comprehensive catalog of military equipment, including tanks,
        aircraft, and more. Register or log in to manage your own entries.
      </p>

      <!-- Buttons -->
      <div class="space-x-4">
        <router-link
          to="/register"
          class="bg-action-blue text-white px-4 py-2 rounded hover:bg-blue-600"
          >Register</router-link
        >
        <router-link
          to="/login"
          class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
