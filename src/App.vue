<template>
  <v-app>
    <alert-box v-if="alertState" :type="store.alertType" :title="store.alertTitle" :description="store.alertDescription"></alert-box>
    <v-app-bar color="secondary" dark>
      <v-app-bar-title>
        <v-img src="@/assets/simply-logo-dark.svg" width="200px"></v-img
      ></v-app-bar-title>
      <v-btn
        v-if="smAndDown"
        icon="mdi-plus"
        color="primary"
        to="/"
      ></v-btn>
      <v-btn-group v-else class="mr-4">
        <v-btn color="white" prepend-icon="mdi-format-list-checkbox" to="/">
          To-Do List
        </v-btn>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="store.addDialog = true"> Add New </v-btn>
      </v-btn-group>
      <v-btn
        icon="mdi-menu"
        v-if="smAndDown"
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
    <navigation v-model="menu" v-if="smAndDown" />
    <add-new-task></add-new-task>
  </v-app>
</template>

<script setup>
import {  onMounted,ref,watch  } from "vue";
import { useDisplay } from 'vuetify'
import alertBox from '@/components/alertBox'
import { useTodosStore } from "@/store/app";
import Navigation from "@/layouts/Navigation";
import addNewTask from '@/components/addNewTask'
const store = useTodosStore();
const menu = ref(false);
const { smAndDown } = useDisplay()

</script>
