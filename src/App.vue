<template>
  <v-app>
    <v-app-bar color="secondary" dark>
      <v-app-bar-title>
        <v-img src="@/assets/simply-logo-dark.svg" width="200px"></v-img
      ></v-app-bar-title>

      <v-btn
        v-if="mobile"
        icon="mdi-plus"
        color="primary"
        to="/"
      ></v-btn>
      <v-btn-group v-else class="mr-4">
        <v-btn color="white" prepend-icon="mdi-format-list-checkbox" to="/">
          To-Do List
        </v-btn>
        <v-btn color="primary" prepend-icon="mdi-plus" to="/"> Add New </v-btn>
      </v-btn-group>
      <v-btn
        icon="mdi-menu"
        v-if="mobile"
        @click="menu = !menu"
      ></v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer
      app
      inset
      bottom
      color="secondary"
      class="elevation-5 text-body-2"
    >
      ©Copyright {{ new Date().getFullYear() }} Simply To-Do List All Rights
      Reserved
    </v-footer>
    <navigation v-model="menu" v-if="mobile" />
  </v-app>
</template>

<script setup>
import {  onMounted,ref,watch  } from "vue";
import { useDisplay } from 'vuetify'
import Navigation from "@/layouts/Navigation";
const menu = ref(false);
const { mobile } = useDisplay()

</script>
