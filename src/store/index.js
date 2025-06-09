import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = !!token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  actions: {
    login({ commit }, token) {
      commit("setToken", token);
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getToken: (state) => state.token,
  },
});
