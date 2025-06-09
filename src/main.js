import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";

const app = createApp(App);

app.config.globalProperties.$axios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

const token = store.getters.getToken;
if (token) {
  app.config.globalProperties.$axios.defaults.headers.Authorization = `Bearer ${token}`;
}

app.use(router).use(store).mount("#app");
