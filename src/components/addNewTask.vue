<template>
  <div>
    <v-dialog
      v-model="store.addDialog"
      persistent
      min-width="300"
      max-width="500"
    >
      <v-card class="pa-3">
        <v-toolbar class="elevation-1 mb-2" density="compact">
          <v-toolbar-title>Add New Task</v-toolbar-title>
          <v-btn icon @click="store.addDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-text-field
          v-model="title"
          outlined
          clearable
          v-on:keypress="isLetter($event)"
          @input="titleCheck()"
          variant="solo"
          class="font-weight-bold mb-2"
          label="Title"
          hide-details
        >
          <template #label>
            <span class="text-red"><strong>* </strong></span>Title
          </template></v-text-field
        >
        <v-combobox
          clearable
          v-model="tags"
          variant="solo"
          class="font-weight-bold mb-2"
          label="Task Tags"
          v-on:keypress="isLetter($event)"
          multiple
          hide-details
          chips
        ></v-combobox>


        <v-text-field
          v-model="endDate"
          solo
          variant="solo"
          label="Task End Date"
          class="font-weight-bold mb-2"
          hide-details=""
          readonly
          @click="datepicker = !datepicker"
        >
          <template #label>
            <span class="text-red"><strong>* </strong></span>Task End Date
          </template></v-text-field
        >
        <div class="d-flex justify-center align-center flex-column">
          <VueDatePicker
            v-model="endDate"
            v-if="datepicker"
            inline
            auto-apply
          ></VueDatePicker>
          <v-btn
            v-if="datepicker"
            class="mt-1"
            color="red"
            width="260px"
            @click="datepicker = !datepicker"
            >Close Calendar</v-btn
          >
        </div>

        <v-card-actions>
          <v-switch
            v-model="state"
            label="Task Status"
            color="green"
            class="font-weight-bold ml-1"
            hide-details
          ></v-switch>

          <v-btn color="green" variant="flat" @click="save()">
            Add New Task
          </v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useTodosStore } from "@/store/app";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const store = useTodosStore();
const tags = ref([]);
const title = ref();
const endDate = ref();
const state = ref(false);
const datepicker = ref(false);
const newTask = ref();

// Set max length for title field
function titleCheck() {
  if (title.value.length == 30) {
    title.value = title.value.substring(0, title.value.length - 1);
  }
}
// Check field for numeric
function isLetter(e) {
  let char = String.fromCharCode(e.keyCode);
  if (/^[A-Za-z]+$/.test(char)) return true;
  else e.preventDefault();
}


function save() {
  if (
    title.value == undefined ||
    title.value == null ||
    endDate.value == undefined ||
    endDate.value == null
  ) {
    store.alertType = "error";
    store.alertText = "Please fill title field and select task end date !";
    store.alertState = true;
  } else {
    this.newTask = {
      title: title,
      tags: tags,
      endDate: endDate,
      state: state,
      description: null,
    };
    store.addTask(this.newTask);
    store.addDialog = false;
    // clear form data
    this.title = null;
    this.tags = null;
    this.endDate = null;
    this.description = null;
    this.state = false;
  }
}
</script>

<style lang="scss" scoped>
</style>
