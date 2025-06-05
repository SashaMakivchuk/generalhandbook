<template>
  <div
    class="container mx-auto px-6 py-8 bg-gradient-to-b from-dark-bg to-[#2f3b3c] text-text-light"
  >
    <button
      @click="$router.go(-1)"
      class="bg-neutral-gray text-text-light p-3 rounded-full mb-6 hover:bg-neutral-gray-hover transition shadow"
      title="Назад"
    >
      <i class="fas fa-arrow-left fa-lg"></i>
    </button>
    <EquipmentList :category="category" />
  </div>
</template>

<script>
import EquipmentList from "../components/EquipmentList.vue";

export default {
  components: { EquipmentList },
  computed: {
    category() {
      return decodeURIComponent(this.$route.params.category);
    },
  },
};
</script>
