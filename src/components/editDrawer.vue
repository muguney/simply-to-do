<template>
   <div class="pa-3" >
      <v-toolbar class="elevation-1 mb-2" density="compact">
        <v-toolbar-title>Edit Task</v-toolbar-title>
      </v-toolbar>

      <v-text-field
        v-model="title"
        outlined
        clearable
        @input="titleCheck()"
        v-on:keypress="isLetter($event)"
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

      <v-card-actions class="d-flex justify-end">
        <v-btn color="red" variant="flat" @click="store.drawer = false">
          Close
        </v-btn>
        <v-btn color="green" variant="flat" @click="save()"> Save </v-btn>
      </v-card-actions>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onActivated, onMounted, ref, watch } from "vue";
import { useTodosStore } from "@/store/app";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const store = useTodosStore();
const { getEditTaskId } = storeToRefs(store);
const title = ref();
const tags = ref([]);
const endDate = ref();
const datepicker = ref(false);
const editTask = ref();

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
watch(getEditTaskId, (newId, oldId) => {
  console.log(newId, oldId);
  const currentTask = store.getTaskById(newId);
  title.value = currentTask.title;
  endDate.value = currentTask.endDate;
  tags.value = currentTask.tags;
});
onMounted(() => {
  const currentTask = store.getTaskById(store.editTaskId);
  title.value = currentTask.title;
  endDate.value = currentTask.endDate;
  tags.value = currentTask.tags;
});

function save() {
  if (title.value == undefined || title.value == null) {
    store.alertType = "error";
    store.alertText = "Please fill the title field!";
    store.alertState = true;
  } else {
    this.editTask = {
      title: title,
      endDate: endDate,
      tags: tags,
    };
    store.editTaskDrawer(store.editTaskId, this.editTask);
    store.alertType = "success";
    store.alertText = "Task edited succesfully!";
    store.alertState = true;
    store.drawer = false;
  }
}
</script>

<style lang="scss" scoped>

</style>
