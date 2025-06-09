<template>
  <div v-if="isAuthenticated" class="bg-dark-bg min-h-screen p-4">
    <h2 class="text-2xl text-text-light mb-4">
      {{ editing ? "Edit Equipment" : "Add Equipment" }}
    </h2>
    <form @submit.prevent="saveEquipment" class="space-y-4">
      <div>
        <label class="block text-text-light">Category</label>
        <input
          v-model="equipment.category"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        />
      </div>
      <div>
        <label class="block text-text-light">Title</label>
        <input
          v-model="equipment.title"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        />
      </div>
      <div>
        <label class="block text-text-light">How Much</label>
        <input
          v-model.number="equipment.how_much"
          type="number"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        />
      </div>
      <div>
        <label class="block text-text-light">Creation Year</label>
        <input
          v-model.number="equipment.creation_year"
          type="number"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        />
      </div>
      <div>
        <label class="block text-text-light">Price USD</label>
        <input
          v-model.number="equipment.price_usd"
          type="number"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        />
      </div>
      <div>
        <label class="block text-text-light">Period of Operation</label>
        <input
          v-model="equipment.period_of_operation"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        />
      </div>
      <div>
        <label class="block text-text-light">Origin</label>
        <input
          v-model="equipment.origin"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        />
      </div>
      <div>
        <label class="block text-text-light">Description</label>
        <textarea
          v-model="equipment.description"
          class="w-full p-2 bg-gray-700 text-text-light rounded"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-action-blue text-white p-2 rounded hover:bg-blue-600"
      >
        {{ editing ? "Update" : "Create" }}
      </button>
      <button
        type="button"
        @click="goBack"
        class="ml-2 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
      >
        Back
      </button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
  <div v-else class="bg-dark-bg min-h-screen flex items-center justify-center">
    <p class="text-text-light">Please log in to access this page.</p>
  </div>
</template>

<script>
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
      editing: false,
      error: "",
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    async saveEquipment() {
      try {
        this.$router.push("/");
      } catch (err) {
        this.error = err.response?.data?.message || "Save failed";
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    if (this.$route.params.id) {
      this.editing = true;
      this.fetchEquipment();
    }
  },
  async fetchEquipment() {
    try {
      const response = await this.$axios.get(
        `/api/equipment/${this.$route.params.id}`
      );
      this.equipment = response.data;
    } catch (err) {
      this.error = err.response?.data?.message || "Fetch failed";
    }
  },
};
</script>
