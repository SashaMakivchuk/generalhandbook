<template>
  <div class="bg-dark-bg min-h-screen">
    <!-- Hero Section -->
    <div
      class="relative bg-gradient-to-br from-dark-bg via-card-bg to-card-bg text-center py-24 px-6 shadow-xl"
    >
      <div
        class="relative bg-cover bg-center h-48 rounded-xl mb-8 shadow-lg animate-fade-in"
      >
        <div class="absolute inset-0 bg-dark-bg opacity-70 rounded-xl"></div>
        <h1
          class="relative text-4xl font-bold text-center pt-20 text-accent-blue shadow-text animate-pulse-slow"
        >
          Довідник генерала
        </h1>
      </div>
    </div>

    <!-- Welcome Section -->
    <div class="container mx-auto py-12 px-4 text-text-light">
      <h2
        class="text-2xl md:text-3xl font-semibold mb-6 border-2 border-text-light rounded-lg p-4"
      >
        Ласкаво просимо
      </h2>
      <p
        class="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed border-2 border-text-light rounded-lg p-4"
      >
        Досліджуйте детальний каталог військової техніки, включаючи танки,
        літаки та інше. Зареєструйтесь або увійдіть, щоб керувати власними
        записами.
      </p>

      <div class="space-x-6">
        <router-link
          to="/register"
          class="bg-action-blue text-text-light px-6 py-3 rounded-xl font-semibold hover:bg-action-blue-hover transition-transform transform hover:scale-105 shadow-md"
        >
          Зареєструватися
        </router-link>
        <router-link
          to="/login"
          class="bg-neutral-gray text-text-light px-6 py-3 rounded-xl font-semibold hover:bg-neutral-gray-hover transition-transform transform hover:scale-105 shadow-md"
        >
          Увійти
        </router-link>
        <div v-if="isAuthenticated">
          <router-link
            to="/home"
            class="bg-action-blue text-text-light px-6 py-3 rounded-xl font-semibold hover:bg-action-blue-hover transition-transform transform hover:scale-105 shadow-md"
          >
            Головна
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "HomePage",
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    return { isAuthenticated };
  },
};
</script>
