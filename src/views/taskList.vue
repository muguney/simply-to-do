<template>
  <div>
    <v-toolbar class="elevation-1 mb-2">
      <v-toolbar-title>To-Do List</v-toolbar-title>
      <v-spacer v-if="!smAndDown"></v-spacer>
      <v-spacer v-if="!smAndDown"></v-spacer>
      <v-spacer v-if="!smAndDown"></v-spacer>
      <v-text-field
        v-model="titleParam"
        outlined
        density="compact"
        clearable
        class="font-weight-bold mr-1"
        prepend-inner-icon="mdi-magnify"
        :label="!smAndDown ? 'Search by title' : 'Search'"
        max-width="200"
        hide-details
      ></v-text-field>

      <v-btn
        v-if="!smAndDown"
        color="primary"
        variant="outlined"
        prepend-icon="mdi-filter-outline"
        @click="filterDialog = true"
      >
        Filters
      </v-btn>

      <v-btn v-else color="primary" icon @click="filterDialog = true">
        <v-icon>mdi-filter-outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-dialog v-model="filterDialog" min-width="300" max-width="500">
      <v-card class="pa-3">
        <v-toolbar class="elevation-1 mb-2" density="compact">
          <v-toolbar-title>To-Do List Filter</v-toolbar-title>
          <v-btn icon @click="filterDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-select
          outlined
          clearable
          v-model="tagsParam"
          :items="store.getTags"
          class="font-weight-bold mb-2"
          item-text="name"
          variant="solo"
          chips
          hide-details
          label="Tag Filter"
          multiple
        >
        </v-select>
        <v-select
          v-model="sortingParam"
          clearable
          label="Sorting"
          class="font-weight-bold mb-2"
          :items="sortingParams"
          hide-details
          item-text="title"
          item-value="value"
          variant="solo"
        ></v-select>
        <v-select
          v-model="taskStatus"
          clearable
          label="Filter by Status"
          class="font-weight-bold"
          hide-details
          :items="stateParams"
          item-text="title"
          item-value="value"
          variant="solo"
        ></v-select>
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
    <div v-if="smAndDown">
      <v-card
        class="mb-2 py-2"
        v-for="(item, i) in store.filterAll(
          tagsParam,
          titleParam ? titleParam.toLowerCase() : '',
          sortingParam,
          taskStatus
        )"
        :key="i"
      >
        <v-card-item>
          <v-card-title>
            <router-link
              :to="'/task-edit/' + item.id"
              class="text-decoration-none"
            >
              <span
                :class="item.state ? 'text-red' : 'text-primary'"
                :style="{
                  'text-decoration': item.state ? 'line-through' : 'none',
                }"
                >{{ item.title }}</span
              ></router-link
            ></v-card-title
          >
          <v-card-subtitle>
            <span
              :style="{
                'text-decoration': item.state ? 'line-through' : 'none',
              }"
              >{{ item.endDate && formatDateTime(item.endDate) }}</span
            ></v-card-subtitle
          >
        </v-card-item>
        <v-card-text>
          <v-row class="my-0 py-0">
            <v-col class="my-0 py-0"
              ><h3 class="mb-1">Description</h3>
              <div v-html="item.description"></div>
            </v-col>
          </v-row>
          <v-row class="my-0 py-0 align-center">
            <v-col class="my-0 py-1">
              <v-chip v-for="(tag, x) in item.tags" :key="x" class="mb-1 mr-1">
                {{ tag }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row class="my-0 py-0 align-center">
            <v-col class="my-0 py-0"><h3 class="mb-1">Status</h3></v-col>
            <v-col class="my-0 py-0">
              <v-checkbox
                v-model="item.state"
                @change="changeStatus(item.id, item.state)"
                hide-details="false"
              ></v-checkbox>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                color="primary"
                prepend-icon="mdi-pencil"
                @click="
                  (store.drawer = true),
                    (store.drawerType = 'edit'),
                    (store.drawerLocation = 'right'),
                    (store.editTaskId = item.columns.id)
                "
              >
                Edit Task
              </v-btn>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
    </div>

    <v-data-table
      v-if="!smAndDown"
      :headers="headers"
      :items="
        store.filterAll(
          tagsParam,
          titleParam ? titleParam.toLowerCase() : '',
          sortingParam,
          taskStatus
        )
      "
      items-per-page="-1"
      class="elevation-1 mt-4"
    >
      <template v-slot:[`item.state`]="{ item }">
        <v-checkbox
          v-model="item.columns.state"
          hide-details="false"
          @change="changeStatus(item.columns.id, item.columns.state)"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.title`]="{ item }">
        <router-link
          :to="'/task-edit/' + item.columns.id"
          class="text-decoration-none"
          :class="item.columns.state ? 'text-red' : 'text-primary'"
        >
          <span
            class="font-weight-bold"
            :style="{
              'text-decoration': item.columns.state ? 'line-through' : 'none',
            }"
            >{{ item.columns.title }}</span
          >
        </router-link>
      </template>
      <template v-slot:[`item.endDate`]="{ item }">
        <span
          :style="{
            'text-decoration': item.columns.state ? 'line-through' : 'none',
          }"
          >{{
            item.columns.endDate && formatDateTime(item.columns.endDate)
          }}</span
        >
      </template>
      <template v-slot:[`item.tags`]="{ item }">
        <v-chip
          v-for="(tag, x) in item.columns.tags"
          :key="x"
          class="mb-1 mr-1"
        >
          {{ tag }}
        </v-chip>
      </template>
      <template v-slot:[`item.description`]="{ item }">
        <div v-html="item.columns.description"></div>
      </template>
      <template v-slot:[`item.edit`]="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="
            (store.drawer = true),
              (store.drawerType = 'edit'),
              (store.drawerLocation = 'right'),
              (store.editTaskId = item.columns.id)
          "
        >
          mdi-pencil
        </v-icon>
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
const { smAndDown } = useDisplay();
const filterDialog = ref(false);
const titleParam = ref();
const sortingParam = ref();
const tagsParam = ref();
const taskStatus = ref();
const headers = ref([
  { title: "Id", key: "id", sortable: false, align: " d-none" },
  { title: "State", width: "90", key: "state", sortable: false },
  { title: "Title", key: "title", sortable: false },
  { title: "Tags", key: "tags", sortable: false },
  { title: "End Date", key: "endDate", sortable: false },
  { title: "Description", key: "description", sortable: false },
  { title: "Edit", key: "edit", sortable: false },
]);
const sortingParams = ref([
  { title: "Sort by State ASC", value: "1" },
  { title: "Sort by State DESC", value: "2" },
  { title: "Sort by End Date ASC", value: "3" },
  { title: "Sort by End Date DESC", value: "4" },
]);
const stateParams = ref([
  { title: "All", value: "0" },
  { title: "Completed Tasks", value: "1" },
  { title: "Uncompleted Tasks", value: "2" },
]);
function formatDateTime(value) {
  return moment(new Date(value)).format("YYYY-MM-DD HH:mm");
}
function changeStatus(id, value) {
  store.updateStatus(id, value, "teta");
}
</script>
<style>
.v-data-table-footer {
  display: none;
}
</style>
