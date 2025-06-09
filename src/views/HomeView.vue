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

    <!-- Content -->
    <div class="container mx-auto py-8 px-4 text-text-light">
      <HomeComponent />
      <!-- Logout Button (visible when authenticated) -->
      <div v-if="isAuthenticated" class="mt-6 text-center">
        <button
          @click="logout"
          class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import HomeComponent from "../components/HomeComponent.vue";

export default {
  components: { HomeComponent },
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const logout = () => {
      store.dispatch("logout");
      // Clear Axios header
      delete this.$axios.defaults.headers.Authorization;
      this.$router.push("/login");
    };

    return { isAuthenticated, logout };
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
