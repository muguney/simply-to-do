<template>
  <div>
    <v-toolbar class="elevation-1 mb-2">
      <v-toolbar-title>Edit Task</v-toolbar-title>
    </v-toolbar>
    <v-card class="pa-3">
      <v-text-field
        v-model="title"
        outlined
        clearable
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
      <vue-editor v-model="description"></vue-editor>
      <v-card-actions>
        <v-switch
          v-model="state"
          label="Task Status"
          color="green"
          class="font-weight-bold ml-1"
          hide-details
        ></v-switch>
        <v-btn color="red" variant="flat" to="/">
          Back to List
        </v-btn>
        <v-btn color="green" variant="flat" @click="save()">
          Save Task
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useTodosStore } from "@/store/app";
import { useRoute, useRouter } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { VueEditor } from "vue3-editor";
const store = useTodosStore();
const route = useRoute();
const router = useRouter();
const title = ref();
const endDate = ref();
const description = ref();
const state = ref(false);
const datepicker = ref(false);
const editTask = ref();

// Set max length for title field
function titleCheck() {
  if (title.value.length == 30) {
    title.value = title.value.substring(0, title.value.length - 1);
  }
}

onMounted(() => {
  const currentTask = store.getTaskById(route.params.taskId);
  console.log(currentTask);
  title.value = currentTask.title;
  endDate.value = currentTask.endDate;
  description.value = currentTask.description;
  state.value = currentTask.state;
});

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
    this.editTask = {
      title: title,
      endDate: endDate,
      state: state,
      description: description,
    };
    store.editTask(route.params.taskId, this.editTask);
    store.alertType = "success";
    store.alertText = "Task edited succesfully!";
    store.alertState = true;
    router.push("/");
  }
}
</script>

<style lang="scss" scoped>
</style>
