import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    filter: "all",
    todos: [{
        id: 1,
        title: "Finish vue screenCast",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "Finish react screenCast",
        completed: false,
        editing: false
      }
    ]
  },
  getters: {
    remaining(state) {
      // return this.$store.state.todos.filter(todo => !todo.completed).length;
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining == 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter == "completed") {
        return state.todos.filter(todo => todo.completed);
      }
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  }
});
