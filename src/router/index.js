import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("@/views/taskList.vue"),
  },
  {
    path: "/task-edit/:taskId",
    name: "task-edit",
    props: true,
    component: () => import("@/views/taskEdit.vue"),
    meta: {
      title: "Edit task",
    }
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
