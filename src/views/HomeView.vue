<template>
  <div class="bg-dark-bg min-h-screen">
    <!-- Hero Section -->
    <div
      class="relative bg-gradient-to-br from-dark-bg via-card-bg to-card-bg text-center py-24 px-6 shadow-2xl animate-fade-in"
    >
      <h1
        class="text-5xl md:text-6xl font-extrabold text-text-light tracking-wide mb-4 animate-pulse-slow"
        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7)"
      >
        General's Handbook
      </h1>
      <p
        class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up"
      >
        Explore a comprehensive catalog of military equipment. Register or log
        in to manage your entries.
      </p>
      <div class="space-x-4">
        <router-link
          to="/register"
          class="bg-action-blue text-text-light px-6 py-3 rounded-lg font-semibold hover:bg-action-blue-hover transition-transform transform hover:scale-105 shadow-md animate-scale-in"
        >
          Register
        </router-link>
        <router-link
          to="/login"
          class="bg-neutral-gray text-text-light px-6 py-3 rounded-lg font-semibold hover:bg-neutral-gray-hover transition-transform transform hover:scale-105 shadow-md animate-scale-in"
        >
          Login
        </router-link>
      </div>
    </div>

    <div class="container mx-auto py-8 px-4 text-text-light">
      <HomeComponent />
      <div v-if="isAuthenticated" class="mt-6 text-center animate-slide-up">
        <button
          @click="logout"
          class="bg-neutral-gray text-text-light px-4 py-2 rounded hover:bg-neutral-gray-hover transition animate-scale-in"
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
      delete this.$axios.defaults.headers.Authorization;
      this.$router.push("/");
    };

    return { isAuthenticated, logout };
  },
};
</script>

<style scoped>
/* Custom animations */
.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

.animate-pulse-slow {
  animation: pulse 2s infinite ease-in-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
</style>
