<template>
  <div class="bg-dark-bg min-h-screen flex items-center justify-center">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl text-text-light mb-4 text-center">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-text-light">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full p-2 bg-gray-700 text-text-light rounded"
            required
          />
        </div>
        <div>
          <label class="block text-text-light">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 bg-gray-700 text-text-light rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-action-blue text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post("/api/login", {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        this.store.dispatch("login", token);
        this.$axios.defaults.headers.Authorization = `Bearer ${token}`;
        this.$router.push("/");
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed";
      }
    },
  },
};
</script>
