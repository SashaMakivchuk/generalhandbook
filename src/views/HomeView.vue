<template>
  <div class="bg-dark-bg min-h-screen">
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
