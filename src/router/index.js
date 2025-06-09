import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import EquipmentDetail from "../components/EquipmentDetail.vue";
import EquipmentForm from "../components/EquipmentForm.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/home",
    name: "HomeView",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/category/:category",
    name: "Category",
    component: CategoryView,
    meta: { requiresAuth: true },
  },
  {
    path: "/equipment/:id",
    name: "EquipmentDetail",
    component: EquipmentDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit/:id",
    name: "EditEquipment",
    component: EquipmentForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/add",
    name: "AddEquipment",
    component: EquipmentForm,
    meta: { requiresAuth: true },
  },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
