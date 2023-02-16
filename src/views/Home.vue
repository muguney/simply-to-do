<template>
  <div>
    <v-toolbar class="elevation-1">
      <v-toolbar-title>To-Do List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
           v-model="titleParam"
          outlined
          clearable
          class="font-weight-bold"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          hide-details
        ></v-text-field>
          <v-spacer></v-spacer>
          <v-select
          outlined
          v-model="tagsParam"
          :items="store.getTags"
          class="align-stretch font-weight-bold"
          item-text="name"
          chips
          pag

          width="100px"
          item-value="id"
          label="Tag Filter"
          multiple
          hide-details
        >
         <!-- <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 3">
              <span>{{ item }}</span>
            </v-chip>
            <span v-else class="grey--text text-caption">
              (+{{ item.length - 3 }})
            </span>
          </template> -->
        </v-select>
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="store.filterAll(tagsParam, titleParam.toLowerCase())"
      :sort-by="[{ key: 'state', order: 'asc' }, { key: 'endDate', order: 'desc' }]"
      item-value="id"
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
          >{{ item.columns.endDate }}</span
        >
      </template>
    </v-data-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useTodosStore } from "@/store/app";
import { storeToRefs } from 'pinia'
import { VDataTable } from "vuetify/labs/VDataTable";
const store = useTodosStore();
const { mobile } = useDisplay();
const titleParam = ref("");
const tagsParam = ref();
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
