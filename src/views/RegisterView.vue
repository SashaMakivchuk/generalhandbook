<template>
  <div class="bg-dark-bg min-h-screen flex items-center justify-center">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl text-text-light mb-4 text-center">Register</h2>
      <form @submit.prevent="register" class="space-y-4">
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
          Register
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <p class="text-text-light mt-2 text-center">
        Already have an account?
        <router-link to="/login" class="text-action-blue hover:underline"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        this.$router.push("/login");
      } catch (err) {
        this.error = err.response?.data?.message || "Registration failed";
      }
    },
  },
};
</script>
