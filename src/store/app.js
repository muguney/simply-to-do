// Utilities
import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
  state: () => ({}),
});
export const useTodosStore = defineStore("todos", {
  state: () => ({
    todoList: [
      {
        id: 0,
        title: "Make a breakfast",
        tags: ["breakfast", "berry", "yogurt", "rasted potato"],
        endDate: "Thu Feb 16 2023 20:59:00 GMT+0300 (GMT+03:00)",
        state: false,
        description: "Make a breakfast in en vie restaurant at 22:00pm",
      },
      {
        id: 1,
        title: "Go to gym",
        tags: ["gym", "yoga", "run"],
        endDate: "Thu Feb 18 2023 20:59:00 GMT+0300 (GMT+03:00)",
        state: true,
        description: "Go to the gym and run 30km",
      },
      {
        id: 2,
        title: "Go to work",
        tags: ["work", "jobs", "run"],
        endDate: "Thu Feb 13 2023 20:59:00 GMT+0300 (GMT+03:00)",
        state: true,
        description: "Go to the work",
      },
    ],
  }),
  getters: {
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
      return (tags, title) => {
        let filteredTodoList = [];
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
        return title
          ? filteredTodoList.filter((items) =>
              items.title.toLowerCase().includes(title)
            )
          : filteredTodoList;
      };
    },
    filterCompleted(state) {
      return (tags, title) => {
        let filteredTodoList = [];
        let tagList = tags;
        console.log("tags", tagList);
        for (let i = 0; i < state.todoList.length; i++) {
          for (let x = 0; x < tagList.length; x++) {
            state.todoList[i].state == true &&
              state.todoList[i].tags.filter((items) =>
                items.includes(tagList[x])
              ).length > 0 &&
              filteredTodoList.push(state.todoList[i]);
          }
        }
        return title
          ? filteredTodoList.filter((items) => items.title.includes(title))
          : filteredTodoList;
      };
    },
    filterUncompleted(state) {
      return (tags, title) => {
        let filteredTodoList = [];
        let tagList = tags;
        console.log("tags", tagList);
        for (let i = 0; i < state.todoList.length; i++) {
          for (let x = 0; x < tagList.length; x++) {
            state.todoList[i].state == false &&
              state.todoList[i].tags.filter((items) =>
                items.includes(tagList[x])
              ).length > 0 &&
              filteredTodoList.push(state.todoList[i]);
          }
        }
        return title
          ? filteredTodoList.filter((items) => items.title.includes(title))
          : filteredTodoList;
      };
    },
  },
});
