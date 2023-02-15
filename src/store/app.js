// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
  }),
})

export const useTodos = defineStore('todos', {
  state: () => ({
    todoList: [
      {
        id: 0,
        title: 'Make a breakfast',
        tags: ['breakfast', 'berry', 'yogurt', 'rasted potato'],
        endDate: 'Thu Feb 16 2023 20:59:00 GMT+0300 (GMT+03:00)',
        state: false,
        description:'Make a breakfast in en vie restaurant at 22:00pm'
      },
      {
        id: 1,
        title: 'Go to gym',
        tags: ['gym', 'yoga', 'run'],
        endDate: 'Thu Feb 18 2023 20:59:00 GMT+0300 (GMT+03:00)',
        state: true,
        description:'Go to the gym and run 30km'
      },
      {
        id: 2,
        title: 'Go to work',
        tags: ['work', 'jobs', 'run'],
        endDate: 'Thu Feb 13 2023 20:59:00 GMT+0300 (GMT+03:00)',
        state: true,
        description:'Go to the work'
      }
    ]
  }),
  getters: {
    completedTodos(state) {
      return state.todos.filter((items) => items.state == true)
    },
    unCompletedTodos(state) {
      return state.todos.filter((items) => items.state == false)
    },
    filterByTitle(state, value) {
      return state.todos.filter((items)=> items.title.includes(value))
    },
    filterByTags(state, value) {
      return state.todos.filter((items)=> items.tags.includes(value))
    }
  }
})

