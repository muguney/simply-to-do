<template>
  <div>
    <v-toolbar class="elevation-1">
      <v-toolbar-title>To-Do List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="filterDialog = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-dialog v-model="filterDialog" width="300">
      <v-card class="pa-3">
        <v-toolbar class="elevation-1 mb-2" density="compact">
          <v-toolbar-title>To-Do List Filter</v-toolbar-title>
          <v-btn icon @click="filterDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-text-field
          v-model="titleParam"
          outlined
          clearable
          variant="solo"
          class="font-weight-bold mb-2"
          prepend-inner-icon="mdi-magnify"
          label="Search by title"
          hide-details
        ></v-text-field>
        <v-select
          outlined
          clearable
          v-model="tagsParam"
          :items="store.getTags"
          class="font-weight-bold"
          item-text="name"
          variant="solo"
          chips
          hide-details
          label="Tag Filter"
          multiple
        >
        </v-select>
        <v-card-actions class="pa-0 ma-0">
          <v-btn
            color="primary"
            class="elevation-2"
            variant="flat"
            block
            @click="filterDialog = false"
            >Close Filter</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="store.filterAll(tagsParam, titleParam.toLowerCase(),'endDate')"
      :sort-by="[
        { key: 'state', order: 'asc' },
        { key: 'endDate', order: 'desc' },
      ]"
      items-per-page="-1"
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
          >{{ item.columns.endDate && formatDateTime(item.columns.endDate) }}</span
        >
      </template>
    </v-data-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import moment from "moment";
import { useTodosStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { VDataTable } from "vuetify/labs/VDataTable";
const store = useTodosStore();
const { mobile } = useDisplay();
const filterDialog = ref(false);
const titleParam = ref("");
const tagsParam = ref();
const headers = ref([
  { title: "State", width: "90", key: "state" },
  { title: "Title", key: "title", sortable: false },
  { title: "Tags", key: "tags", sortable: false },
  { title: "End Date", key: "endDate" },
  { title: "Description", key: "description", sortable: false },
]);
const selected = ref([]);
function formatDateTime(value) {
  return moment(value).format("YYYY-MM-DD HH:mm");
}
</script>
<style>
.v-data-table-footer {
  display: none;
}
</style>
