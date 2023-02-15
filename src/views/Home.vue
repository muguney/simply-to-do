<template>
  <div>
    <v-toolbar class="elevation-1">
      <v-toolbar-title>To-Do List</v-toolbar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      hide-default-footer
      items-per-page="-1"
      :items="todoList"
       :sort-by="[{ key: 'state', order: 'asc' }, { key: 'endDate', order: 'desc' }]"
      item-value="id"
      class="elevation-1 mt-4"
    >
      <template v-slot:[`item.state`]="{ item }">
        <v-checkbox
          v-model="item.columns.state"
          hide-details="false"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        <span
          :style="{
            'text-decoration': item.columns.state ? 'line-through' : 'none',
          }"
          >{{ item.columns.title }}</span
        >
      </template>
      <template v-slot:[`item.endDate`]="{ item }">
        <span
          :style="{
            'text-decoration': item.columns.state ? 'line-through' : 'none',
          }"
          >{{ item.columns.endDate }}</span
        >
      </template>
    </v-data-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useTodos } from "@/store/app";
import { VDataTable } from "vuetify/labs/VDataTable";
import checkTask from "@/components/checkTask";
const store = useTodos();
const todoList = ref(store.todoList);
const { mobile } = useDisplay();
const headers = ref([
  { title: "State", width: "90", key: "state" },
  { title: "Title", key: "title", sortable:false},
  { title: "Tags", key: "tags", sortable:false },
  { title: "End Date", key: "endDate" },
  { title: "Description", key: "description", sortable:false },
]);
const selected = ref([]);
</script>
<style>
.v-data-table-footer{
  display: none;
}
</style>
