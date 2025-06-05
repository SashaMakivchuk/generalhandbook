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
    <div v-else class="bg-card-bg rounded-xl p-6 shadow-lg">
      <h1
        class="text-3xl font-bold mb-6 text-accent-blue text-center shadow-text"
      >
        {{ isEdit ? "Редагувати техніку" : "Додати техніку" }}
      </h1>
      <form @submit.prevent="saveEquipment" class="grid gap-4">
        <div class="flex flex-wrap gap-2.5 items-center">
          <label
            for="category"
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-folder fa-sm"></i> Категорія:
          </label>
          <input
            id="category"
            v-model="equipment.category"
            type="text"
            required
            placeholder="Введіть категорію"
            class="flex-1 p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue"
          />
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <label
            for="title"
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-tag fa-sm"></i> Назва:
          </label>
          <input
            id="title"
            v-model="equipment.title"
            type="text"
            required
            placeholder="Введіть назву"
            class="flex-1 p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue"
          />
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <label
            for="how_much"
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-cubes fa-sm"></i> Кількість:
          </label>
          <input
            id="how_much"
            v-model.number="equipment.how_much"
            type="number"
            min="0"
            required
            placeholder="0"
            class="flex-1 p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue"
          />
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <label
            for="creation_year"
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-calendar fa-sm"></i> Рік створення:
          </label>
          <input
            id="creation_year"
            v-model.number="equipment.creation_year"
            type="number"
            min="1900"
            max="2100"
            required
            placeholder="0"
            class="flex-1 p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue"
          />
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <label
            for="price_usd"
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-dollar-sign fa-sm"></i> Ціна (USD):
          </label>
          <input
            id="price_usd"
            v-model.number="equipment.price_usd"
            type="number"
            min="0"
            required
            placeholder="0"
            class="flex-1 p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue"
          />
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <label
            for="period_of_operation"
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-clock fa-sm"></i> Період експлуатації:
          </label>
          <input
            id="period_of_operation"
            v-model="equipment.period_of_operation"
            type="text"
            required
            placeholder="Введіть період"
            class="flex-1 p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue"
          />
        </div>
        <div class="flex flex-wrap gap-2.5 items-center">
          <label
            for="origin"
            class="font-bold text-text-light min-w-[150px] flex items-center gap-2"
          >
            <i class="fas fa-globe fa-sm"></i> Походження:
          </label>
          <input
            id="origin"
            v-model="equipment.origin"
            type="text"
            required
            placeholder="Введіть країну"
            class="flex-1 p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue"
          />
        </div>
        <div class="flex flex-col gap-2.5">
          <label
            for="description"
            class="font-bold text-text-light flex items-center gap-2"
          >
            <i class="fas fa-file-alt fa-sm"></i> Опис:
          </label>
          <textarea
            id="description"
            v-model="equipment.description"
            required
            placeholder="Введіть опис"
            class="w-full p-3 bg-dark-bg text-text-light border border-border-gray rounded-lg min-h-[100px] focus:ring-2 focus:ring-accent-blue"
          ></textarea>
        </div>
        <div class="flex gap-4 justify-center">
          <button
            type="submit"
            class="bg-action-blue text-text-light p-3 rounded-full hover:bg-action-blue-hover transition shadow disabled:bg-neutral-gray disabled:cursor-not-allowed"
            :disabled="saving"
            title="Зберегти"
          >
            <i class="fas fa-save fa-lg"></i>
          </button>
          <button
            type="button"
            @click="cancelEdit"
            class="bg-neutral-gray text-text-light p-3 rounded-full hover:bg-neutral-gray-hover transition shadow"
            title="Скасувати"
          >
            <i class="fas fa-times fa-lg"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      equipment: {
        category: "",
        title: "",
        how_much: 0,
        creation_year: 0,
        price_usd: 0,
        period_of_operation: "",
        origin: "",
        description: "",
      },
      loading: false,
      saving: false,
      error: "",
      isEdit: false,
      previousRoute: null,
    };
  },
  methods: {
    async fetchEquipment() {
      if (!this.$route.params.id) return;
      this.loading = true;
      try {
        console.log(`Fetching equipment with ID: ${this.$route.params.id}`);
        const response = await fetch(
          `${API_BASE_URL}/api/equipment/${this.$route.params.id}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        this.equipment = await response.json();
        this.isEdit = true;
      } catch (err) {
        this.error = `Помилка завантаження даних: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    async saveEquipment() {
      this.saving = true;
      try {
        const method = this.isEdit ? "PUT" : "POST";
        const url = this.isEdit
          ? `${API_BASE_URL}/api/equipment/${this.$route.params.id}`
          : `${API_BASE_URL}/api/equipment`;
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.equipment),
        });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const savedEquipment = await response.json();
        this.$router.replace(`/equipment/${savedEquipment._id}`);
      } catch (err) {
        this.error = `Помилка збереження: ${err.message}`;
      } finally {
        this.saving = false;
      }
    },
    cancelEdit() {
      if (this.previousRoute && this.previousRoute.name !== "EditEquipment") {
        this.$router.push(this.previousRoute);
      } else {
        this.$router.push("/");
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.previousRoute = from;
    });
  },
  created() {
    if (this.$route.params.id) {
      this.fetchEquipment();
    }
  },
};
</script>
