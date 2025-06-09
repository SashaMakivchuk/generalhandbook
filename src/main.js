import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

app.config.globalProperties.$axios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

app.use(router).mount("#app");
