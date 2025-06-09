<template>
  <div class="min-h-screen">
    <div
      class="relative bg-gradient-to-br from-[#1c2526] via-[#2f3b3c] to-[#3a4a4b] text-center py-24 px-6 shadow-2xl animate-fade-in"
    >
      <h1
        class="text-5xl md:text-6xl font-extrabold text-white tracking-wide mb-4 animate-pulse-slow"
        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7)"
      >
        Довідник Генерала
      </h1>
      <p
        class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up"
      >
        Досліджуйте каталог військової техніки. Зареєструйтесь або увійдіть, щоб
        керувати своїми записами.
      </p>
      <div class="space-x-4">
        <router-link
          to="/register"
          class="bg-accent-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
        >
          Register
        </router-link>
        <router-link
          to="/login"
          class="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-md"
        >
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

.animate-pulse-slow {
  animation: pulse 3s infinite ease-in-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
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
</style>
