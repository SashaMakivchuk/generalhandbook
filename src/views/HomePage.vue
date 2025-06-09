<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div
      class="relative bg-gradient-to-br from-dark-bg via-card-bg to-card-bg text-center py-28 px-6 shadow-xl"
    >
      <h1
        class="text-5xl md:text-7xl font-extrabold text-text-light tracking-wide mb-6"
        style="text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8)"
      >
        Довідник Генерала
      </h1>
      <p
        class="text-2xl md:text-3xl text-text-light mb-10 max-w-3xl mx-auto leading-relaxed"
      >
        Досліджуйте каталог військової техніки. Зареєструйтесь або увійдіть, щоб
        керувати своїми записами.
      </p>
      <div class="space-x-6">
        <router-link
          to="/register"
          class="bg-action-blue text-text-light px-8 py-4 rounded-xl font-semibold hover:bg-action-blue-hover transition-transform transform hover:scale-105 shadow-lg"
        >
          Зареєструватися
        </router-link>
        <router-link
          to="/login"
          class="bg-neutral-gray text-text-light px-8 py-4 rounded-xl font-semibold hover:bg-neutral-gray-hover transition-transform transform hover:scale-105 shadow-lg"
        >
          Увійти
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
