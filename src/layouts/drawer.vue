<template>
  <v-navigation-drawer
    permanent
    :theme="store.drawerType == 'menu' ? 'dark' : 'light'"
    fixed
    app
    :width="store.drawerType == 'edit' ? 350 : 250"
    :location="store.drawerLocation"
  >
    <menu-drawer v-if="store.drawerType == 'menu'"></menu-drawer>
    <edit-drawer v-if="store.drawerType == 'edit'"></edit-drawer>
  </v-navigation-drawer>
</template>
<script setup>
import { useTodosStore } from "@/store/app";
import menuDrawer from "@/components/menuDrawer";
import editDrawer from '@/components/editDrawer'
const store = useTodosStore();
</script>

