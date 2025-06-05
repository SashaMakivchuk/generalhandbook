<template>
  <EquipmentForm :isEdit="true" :equipmentData="equipment" />
</template>

<script>
import EquipmentForm from "../components/EquipmentForm.vue";

export default {
  components: { EquipmentForm },
  data() {
    return {
      equipment: {},
    };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await fetch(`http://localhost:3000/api/equipment/${id}`);
      this.equipment = await response.json();
    } catch (err) {
      console.error("Error fetching equipment:", err);
    }
  },
};
</script>
