<template>
  <div
    class="container mx-auto px-6 py-8 bg-gradient-to-b from-dark-bg to-card-bg text-text-light min-h-screen"
  >
    <div
      v-if="loading"
      class="text-center text-error-red text-lg mt-5 animate-fade-in"
    >
      Завантаження...
    </div>
    <div
      v-else-if="error"
      class="text-center text-error-red text-lg mt-5 animate-fade-in"
    >
      {{ error }}
    </div>
    <div
      v-else-if="equipment"
      class="bg-card-bg rounded-xl p-6 shadow-lg animate-slide-up"
    >
      <h1
        class="text-3xl font-bold mb-6 text-accent-blue text-center shadow-text"
      >
        {{ equipment.title }}
      </h1>
      <div class="grid gap-4">
        <div class="flex flex-wrap gap-2.5 items-center animate-fade-in">
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-folder fa-sm"></i> Категорія:
          </span>
          <span class="text-text-light flex-1">{{ equipment.category }}</span>
        </div>
        <div
          class="flex flex-wrap gap-2.5 items-center animate-fade-in delay-100"
        >
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-cubes fa-sm"></i> Кількість:
          </span>
          <span class="text-text-light flex-1">{{ equipment.how_much }}</span>
        </div>
        <div
          class="flex flex-wrap gap-2.5 items-center animate-fade-in delay-200"
        >
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-calendar fa-sm"></i> Рік створення:
          </span>
          <span class="text-text-light flex-1">{{
            equipment.creation_year
          }}</span>
        </div>
        <div
          class="flex flex-wrap gap-2.5 items-center animate-fade-in delay-300"
        >
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-dollar-sign fa-sm"></i> Ціна (USD):
          </span>
          <span class="text-text-light flex-1">{{
            equipment.price_usd.toLocaleString()
          }}</span>
        </div>
        <div
          class="flex flex-wrap gap-2.5 items-center animate-fade-in delay-400"
        >
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-clock fa-sm"></i> Період експлуатації:
          </span>
          <span class="text-text-light flex-1">{{
            equipment.period_of_operation
          }}</span>
        </div>
        <div
          class="flex flex-wrap gap-2.5 items-center animate-fade-in delay-500"
        >
          <span
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-globe fa-sm"></i> Походження:
          </span>
          <span class="text-text-light flex-1">{{ equipment.origin }}</span>
        </div>
        <div class="flex flex-col gap-2.5 animate-fade-in delay-600">
          <span class="font-bold text-text-light flex items-center gap-2">
            <i class="fas fa-file-alt fa-sm"></i> Опис:
          </span>
          <span class="text-text-light">{{ equipment.description }}</span>
        </div>
      </div>
      <div class="flex gap-4 justify-center mt-6">
        <router-link
          :to="'/edit/' + equipment._id"
          class="bg-action-blue text-text-light p-3 rounded-full hover:bg-action-blue-hover transition animate-scale-in"
          title="Редагувати"
        >
          <i class="fas fa-pencil-alt fa-lg"></i>
        </router-link>
        <button
          @click="goBack"
          class="bg-neutral-gray text-text-light p-3 rounded-full hover:bg-neutral-gray-hover transition animate-scale-in"
          title="Назад"
        >
          <i class="fas fa-arrow-left fa-lg"></i>
        </button>
      </div>
    </div>
    <div v-else class="text-center text-error-red text-lg mt-5 animate-fade-in">
      Техніка не знайдена
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      equipment: null,
      loading: false,
      error: null,
      previousRoute: null,
    };
  },
  methods: {
    async fetchEquipment() {
      if (!this.$route || !this.$route.params || !this.$route.params.id) {
        this.error = "Невалідний маршрут";
        this.$router.replace("/");
        return;
      }
      this.loading = true;
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/equipment/${this.$route.params.id}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            this.error = "Техніка не знайдена";
            this.$router.replace("/");
            return;
          }
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        this.equipment = data;
      } catch (err) {
        this.error = `Помилка завантаження даних: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      const previousRoute = this.previousRoute || { path: "/" };
      if (
        previousRoute.name !== "EditEquipment" &&
        previousRoute.name !== "AddEquipment"
      ) {
        this.$router.replace(previousRoute);
      } else {
        this.$router.replace("/");
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.previousRoute = from;
    });
  },
  created() {
    this.fetchEquipment();
  },
};
</script>
