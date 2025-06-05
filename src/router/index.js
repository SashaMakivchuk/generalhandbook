import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import EquipmentDetail from "../components/EquipmentDetail.vue";
import EquipmentForm from "../components/EquipmentForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/category/:category",
    name: "Category",
    component: CategoryView,
  },
  {
    path: "/equipment/:id",
    name: "EquipmentDetail",
    component: EquipmentDetail,
  },
  {
    path: "/edit/:id",
    name: "EditEquipment",
    component: EquipmentForm,
  },
  {
    path: "/add",
    name: "AddEquipment",
    component: EquipmentForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
