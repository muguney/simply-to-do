<template>
  <div>
    <v-snackbar
      v-model="store.alertState"
      :value="store.alertType"
      app
      timeout="2000"
      :color="store.alertType"
      multi-line
      top
    >
      <v-row align="center">
        <v-col md="auto">
          <v-icon large>{{
            store.alertType == "success"
              ? "mdi-check-circle"
              : "mdi-alert-circle-outline"
          }}</v-icon>
        </v-col>
        <v-col>
          <code class="text-subtitle-1">{{ store.alertText }}</code>
        </v-col>
      </v-row>
    </v-snackbar>
  </div>
</template>

<script setup>
import { useTodosStore } from "@/store/app";
const store = useTodosStore();
</script>

<style lang="scss" scoped>
</style>
