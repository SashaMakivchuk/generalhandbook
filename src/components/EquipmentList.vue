<template>
  <div
    class="container mx-auto px-6 py-8 bg-gradient-to-b from-dark-bg to-[#2f3b3c] text-text-light"
  >
    <h1 class="text-3xl font-bold mb-8 text-accent-blue shadow-text">
      {{ category ? `Техніка: ${category}` : "Вся техніка" }}
    </h1>
    <input
      v-model="filter"
      placeholder="Фільтр за назвою або категорією"
      class="w-full p-3 mb-6 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue transition"
    />
    <ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="item in filteredEquipment"
        :key="item._id"
        class="bg-card-bg rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 relative"
      >
        <router-link :to="'/equipment/' + item._id" class="block p-4">
          <span class="text-accent-blue font-semibold flex items-center gap-2">
            <i class="fas fa-tag fa-sm"></i>
            {{ item.title }} ({{ item.category }})
          </span>
        </router-link>
        <button
          @click="deleteEquipment(item._id)"
          class="absolute top-2 right-2 bg-delete-red text-text-light p-2 rounded-full hover:bg-delete-red-hover transition"
          title="Вилучити"
        >
          <i class="fas fa-trash fa-sm"></i>
        </button>
      </li>
    </ul>
    <router-link
      to="/add"
      class="fixed bottom-6 right-6 bg-action-blue text-text-light p-4 rounded-full shadow-lg hover:bg-action-blue-hover transition"
      title="Додати техніку"
    >
      <i class="fas fa-plus fa-lg"></i>
    </router-link>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";

export default {
  props: {
    category: String,
  },
  data() {
    return {
      equipment: [],
      filter: "",
    };
  },
  computed: {
    filteredEquipment() {
      let filtered = this.equipment;
      if (this.category) {
        filtered = filtered.filter((item) => item.category === this.category);
      }
      return filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(this.filter.toLowerCase()) ||
          item.category.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
  },
  methods: {
    async fetchEquipment() {
      try {
        console.log(`Fetching equipment from ${API_BASE_URL}/api/equipment`);
        const response = await fetch(`${API_BASE_URL}/api/equipment`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        this.equipment = await response.json();
      } catch (err) {
        console.error("Error fetching equipment:", err.message);
      }
    },
    async deleteEquipment(id) {
      try {
        await fetch(`${API_BASE_URL}/api/equipment/${id}`, {
          method: "DELETE",
        });
        this.equipment = this.equipment.filter((item) => item._id !== id);
      } catch (err) {
        console.error("Error deleting equipment:", err.message);
      }
    },
  },
  created() {
    this.fetchEquipment();
  },
};
</script>
