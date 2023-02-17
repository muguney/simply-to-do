<template>
  <div>
    <v-alert
      :type="store.alertType"
      :title="store.alertTitle"
      :text="store.alertDescription"
    ></v-alert>
  </div>
</template>

<script setup>
import { useTodosStore } from "@/store/app";
const props = defineProps(["type", "title", "text"]);
const store = useTodosStore();
</script>

<style lang="scss" scoped>
</style>
