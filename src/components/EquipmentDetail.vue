<template>
  <div
    class="container mx-auto px-6 py-8 bg-gradient-to-b from-dark-bg to-[#2f3b3c] text-text-light min-h-screen"
  >
    <div v-if="loading" class="text-center text-error-red text-lg mt-5">
      Завантаження...
    </div>
    <div v-else-if="error" class="text-center text-error-red text-lg mt-5">
      {{ error }}
    </div>
    <div v-else-if="equipment" class="bg-card-bg rounded-xl p-6 shadow-lg">
      <h1
        class="text-3xl font-bold mb-6 text-accent-blue text-center shadow-text"
      >
        {{ equipment.title }}
      </h1>
      <div class="grid gap-4">
        <div class="flex flex-wrap gap-2.5 items-center">
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-folder fa-sm"></i> Категорія:
          </span>
          <span class="text-text-light flex-1">{{ equipment.category }}</span>
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-cubes fa-sm"></i> Кількість:
          </span>
          <span class="text-text-light flex-1">{{ equipment.how_much }}</span>
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-calendar fa-sm"></i> Рік створення:
          </span>
          <span class="text-text-light flex-1">{{
            equipment.creation_year
          }}</span>
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-dollar-sign fa-sm"></i> Ціна (USD):
          </span>
          <span class="text-text-light flex-1">{{
            equipment.price_usd.toLocaleString()
          }}</span>
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-clock fa-sm"></i> Період експлуатації:
          </span>
          <span class="text-text-light flex-1">{{
            equipment.period_of_operation
          }}</span>
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-globe fa-sm"></i> Походження:
          </span>
          <span class="text-text-light flex-1">{{ equipment.origin }}</span>
        </div>
        <div class="flex flex-col gap-2.5">
          <span class="font-bold text-text-light flex items-center gap-2">
            <i class="fas fa-file-alt fa-sm"></i> Опис:
          </span>
          <span class="text-text-light">{{ equipment.description }}</span>
        </div>
      </div>
      <div class="flex gap-4 justify-center mt-6">
        <router-link
          :to="'/edit/' + equipment._id"
          class="bg-action-blue text-text-light p-3 rounded-full hover:bg-action-blue-hover transition shadow"
          title="Редагувати"
        >
          <i class="fas fa-pencil-alt fa-lg"></i>
        </router-link>
        <button
          @click="goBack"
          class="bg-neutral-gray text-text-light p-3 rounded-full hover:bg-neutral-gray-hover transition shadow"
          title="Назад"
        >
          <i class="fas fa-arrow-left fa-lg"></i>
        </button>
      </div>
    </div>
    <div v-else class="text-center text-error-red text-lg mt-5">
      Техніка не знайдена
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipment: null,
      loading: true,
      error: null,
      previousRoute: null,
    };
  },
  methods: {
    async fetchEquipment() {
      try {
        console.log(`Fetching equipment with ID: ${this.$route.params.id}`);
        const response = await fetch(
          `http://localhost:3000/api/equipment/${this.$route.params.id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.equipment = await response.json();
      } catch (err) {
        this.error = `Помилка завантаження даних: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      // Navigate to the previous route, skipping edit page
      if (this.previousRoute && this.previousRoute.name !== "EditEquipment") {
        this.$router.push(this.previousRoute);
      } else {
        this.$router.push("/");
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // Store the previous route before entering the detail page
      vm.previousRoute = from;
    });
  },
  created() {
    this.fetchEquipment();
  },
};
</script>
