<template>
  <div
    class="container mx-auto px-6 py-8 bg-gradient-to-b from-dark-bg to-[#2f3b3c] text-text-light min-h-screen"
  >
    <div class="relative bg-cover bg-center h-48 rounded-xl mb-8 shadow-lg">
      <div class="absolute inset-0 bg-dark-bg opacity-70 rounded-xl"></div>
      <h1
        class="relative text-4xl font-bold text-center pt-20 text-accent-blue shadow-text"
      >
        Довідник генерала
      </h1>
    </div>
    <div class="flex gap-6 lg:flex-row flex-col">
      <div class="search-section flex-2 bg-card-bg rounded-xl p-6 shadow-lg">
        <input
          v-model="searchQuery"
          placeholder="Пошук за назвою або категорією"
          class="w-full p-3 mb-6 bg-dark-bg text-text-light border border-border-gray rounded-lg focus:ring-2 focus:ring-accent-blue transition"
        />
        <div v-if="searchQuery" class="search-results">
          <h2 class="text-xl font-semibold mb-4 text-text-light">
            Результати пошуку
          </h2>
          <ul class="space-y-3">
            <li
              v-for="item in filteredEquipment"
              :key="item._id"
              class="py-3 border-b border-border-gray"
            >
              <router-link
                :to="'/equipment/' + item._id"
                class="text-accent-blue hover:text-action-blue-hover flex items-center gap-2"
              >
                <i class="fas fa-search fa-sm"></i>
                {{ item.title }} ({{ item.category }})
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="catalog-section flex-1 bg-card-bg rounded-xl p-6 shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-text-light">Каталог</h3>
        <ul class="space-y-2">
          <li
            v-for="category in categories"
            :key="category"
            class="border-b border-border-gray"
          >
            <router-link
              :to="'/category/' + encodeURIComponent(category)"
              class="block"
            >
              <div
                class="p-4 bg-dark-bg rounded-lg hover:bg-gradient-to-r from-dark-bg to-[#3a4a4b] transition transform hover:scale-105"
              >
                <span class="text-accent-blue flex items-center gap-2">
                  <i class="fas fa-folder fa-sm"></i>
                  {{ category }}
                </span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      equipment: [],
      searchQuery: "",
      categories: [],
    };
  },
  computed: {
    filteredEquipment() {
      return this.equipment.filter(
        (item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchEquipment() {
      try {
        console.log(`Fetching equipment from ${API_BASE_URL}/api/equipment`);
        const response = await this.$axios.get(`${API_BASE_URL}/api/equipment`);
        if (!response.data) throw new Error("No data received");
        this.equipment = response.data;
        this.categories = [
          ...new Set(this.equipment.map((item) => item.category)),
        ].sort();
      } catch (err) {
        console.error("Error fetching equipment:", err.message);
      }
    },
  },
  created() {
    this.fetchEquipment();
  },
};
</script>
