// Utilities
import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => ({}),
});
export const useTodosStore = defineStore("todos", {
  state: () => ({
    drawer: false,
    drawerType: "menu",
    drawerLocation: "left",
    editTaskId: "",
    lastId: 2,
    addDialog: false,
    alertState: false,
    alertType: "success",
    alertText: "",
    todoList: [
      {
        id: 0,
        title: "Take a shower",
        tags: ["personal hygiene", "shower", "yogurt", "rasted potato"],
        endDate: "Thu Feb 14 2023 06:00:00 GMT+0300 (GMT+03:00)",
        state: true,
        description: "Take a shower before go to gym",
      },
      {
        id: 1,
        title: "Go to gym",
        tags: ["gym", "yoga", "run"],
        endDate: "Thu Feb 14 2023 07:00:00 GMT+0300 (GMT+03:00)",
        state: true,
        description: "Go to the gym and run 30km",
      },
      {
        id: 2,
        title: "Have breakfast",
        tags: ["breakfast", "jimmy's place", "pancake","orange juice"],
        endDate: "Thu Feb 14 2023 08:00:00 GMT+0300 (GMT+03:00)",
        state: false,
        description: "Go to <b>Jimmy's place</b> for eating pancake and drinking orange juice",
      },
      {
        id: 3,
        title: "Go to work",
        tags: ["work", "office"],
        endDate: "Thu Feb 14 2023 09:00:00 GMT+0300 (GMT+03:00)",
        state: false,
        description: "",
      },
      {
        id: 4,
        title: "Meeting with Falcon Co.",
        tags: ["falcon", "meeting", "presentation"],
        endDate: "Thu Feb 14 2023 11:00:00 GMT+0300 (GMT+03:00)",
        state: false,
        description: "Review the presentation before the meeting with <b style='color:red;'>Falcon</b>.",
      },
    ],
  }),
  actions: {
    updateStatus(id, value) {
      this.todoList.find((item) => item.id == id).state = value;
    },
    addTask(newTask) {
      this.lastId++;
      const newItem = {
        id: this.lastId,
        title: newTask.title,
        tags: newTask.tags,
        endDate: newTask.endDate,
        state: newTask.state,
        description: newTask.description,
      };
      this.todoList.push(newItem);
    },
    editTask(id, editTask) {
      const task = this.todoList.find((item) => item.id == id)
      task.title = editTask.title
      task.endDate = editTask.endDate
      task.description = editTask.description
      task.state = editTask.state
    },
    editTaskDrawer(id, editTask) {
      const task = this.todoList.find((item) => item.id == id)
      task.title = editTask.title
      task.endDate = editTask.endDate
      task.tags = editTask.tags
    }
  },
  getters: {
    getEditTaskId: (state) => {
      return state.editTaskId
    },
    getTaskById: (state) => {
      return (taskId) =>  state.todoList.find((item) => item.id == taskId)
    },
    getTags: (state) => {
      let tags = [];
      for (let i = 0; i < state.todoList.length; i++) {
        for (let x = 0; x < state.todoList[i].tags.length; x++) {
          !tags.includes(state.todoList[i].tags[x]) &&
            tags.push(state.todoList[i].tags[x]);
        }
      }
      return tags.sort();
    },
    filterAll: (state) => {
      return (tags, title, sort, taskStatus) => {
        let filteredTodoList = [];

        // Filter by tags
        let tagList = tags ? tags : "";
        if (tags && tags.length > 0) {
          for (let i = 0; i < state.todoList.length; i++) {
            for (let x = 0; x < tagList.length; x++) {
              filteredTodoList.filter((item) => item.id == state.todoList[i].id)
                .length < 1 &&
                state.todoList[i].tags.filter((items) =>
                  items.includes(tagList[x])
                ).length > 0 &&
                filteredTodoList.push(state.todoList[i]);
            }
          }
        } else {
          filteredTodoList = state.todoList;
        }
        // Filter by title
        filteredTodoList = title
          ? filteredTodoList.filter((items) =>
              items.title.toLowerCase().includes(title)
            )
          : filteredTodoList;

        // Sorting
        if (sort) {
          switch (parseInt(sort)) {
            case 1: // byStateAsc
              filteredTodoList = filteredTodoList.sort((a, b) =>
                b.state < a.state ? 1 : -1
              );
              break;
            case 2: // byStateDesc
              filteredTodoList = filteredTodoList.sort((a, b) =>
                a.state < b.state ? 1 : -1
              );
              break;
            case 3: // byEndDateAsc
              filteredTodoList = filteredTodoList.sort((a, b) =>
                b.endDate < a.endDate ? 1 : -1
              );
              break;
            case 4: // byEndDateDesc
              filteredTodoList = filteredTodoList.sort((a, b) =>
                a.endDate < b.endDate ? 1 : -1
              );
              break;
            default:
              return filteredTodoList;
              break;
          }
        }

        // Status
        if (taskStatus) {
          switch (parseInt(taskStatus)) {
            case 1: // Completed
              filteredTodoList = filteredTodoList.filter(
                (items) => items.state == true
              );
              break;
            case 2: // Uncompleted
              filteredTodoList = filteredTodoList.filter(
                (items) => items.state == false
              );
              break;
            default:
              filteredTodoList = filteredTodoList;
              break;
          }
        }
        return filteredTodoList;
      };
    },
  },
});
