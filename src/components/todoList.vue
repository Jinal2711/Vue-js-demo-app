<template>
  <div class="rootClass">
    <div>
      <input
        type="text"
        class="todo_input"
        placeholder="what needs to be done"
        autofocus
        v-model="newTodo"
        @keyup.enter="addTodo"
      >
    </div>

    <div class="todoItemList">
      <transition-group
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <!-- <todo-item
          class="todoItems"
          v-for="(todo,index) in todosFiltered"
          :key="todo.id"
          :todo="todo"
          :index="index"
          @removedTodo="removeTodo"
          @finishedEdit="finishedEdit"
          :checkAll="anyRemaining"
        >-->
        <todo-item
          class="todoItems"
          v-for="(todo,index) in todosFiltered"
          :key="index"
          :todo="todo"
          :index="index"
          :checkAll="anyRemaining"
        >
          <!-- <div class="todo-item-left">
            <input type="checkbox" class="itemCheckbox" v-model="todo.completed">

            <div
              v-if="!todo.editing"
              @dblclick="editTodo(todo)"
              class="todo-item-label"
              :class="{completed: todo.completed}"
            >{{todo.title}}</div>

            <input
              v-else
              type="text"
              class="todo-item-edit hiddenInput"
              v-model="todo.title"
              v-focus
              @blur="doneEditingTodo(todo)"
              @keyup.enter="doneEditingTodo(todo)"
              @keyup.esc="cancdelEdit(todo)"
            >
          </div>

          <div class="remove-item" @click="removeTodo(index)">&times;</div>-->
        </todo-item>
      </transition-group>

      <div class="extra-container itemCheckbox">
        <!-- <div>
          <label>
            <input type="checkbox" :checked="anyRemaining" @change="checkAllTodos"> Check All
          </label>
        </div>-->
        <!-- <todo-check-all :anyRemaining="anyRemaining"></todo-check-all> -->
        <todo-check-all></todo-check-all>
        <!-- <div>{{remaining}} item left</div> -->
        <!-- <TodoItemsRemaining :remaining="remaining"></TodoItemsRemaining> -->
        <TodoItemsRemaining></TodoItemsRemaining>
      </div>

      <div class="extra-container todoBtn">
        <!-- <div>
          <button :class="{active:filter=='all'}" @click="filter='all'">All</button>
          <button :class="{active:filter=='completed'}" @click="filter='completed'">completed</button>
          <button :class="{active:filter=='active'}" @click="filter='active'">Active</button>
        </div>-->
        <TodoFilter></TodoFilter>
        <div style="color:black;">
          <!-- <button
            v-if="showClearCompletedButton"
            :class="{clearBtn: clearCompletedButton}"
            @click="clearCompletedButton"
          >Clear completed</button>-->
          <ClearCompletedButton :showClearCompletedButton="showClearCompletedButton"></ClearCompletedButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import TodoItemsRemaining from "./todosItemRemaining.vue";
import TodoCheckAll from "./todosCheckAll.vue";
import TodoFilter from "./todosFiltered.vue";
import ClearCompletedButton from "./todosClearCompleted.vue";
export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilter,
    ClearCompletedButton
  },
  data() {
    return {
      newTodo: "",
      newIdForTodo: 3,
      beforeEditCache: ""
      // filter: "all",
      // todos: [
      //   {
      //     id: 1,
      //     title: "Finish vue screenCast",
      //     completed: false,
      //     editing: false
      //   },
      //   {
      //     id: 2,
      //     title: "Finish react screenCast",
      //     completed: false,
      //     editing: false
      //   }
      // ]
    };
  },
  created() {
    // eventBus.$on("removedTodo", index => this.removeTodo(index));
    //eventBus.$on("finishedEdit", data => this.finishedEdit(data));
    eventBus.$on("checkAllChanged", checked => this.checkAllTodos(checked));
    eventBus.$on(
      "filterChanged",
      filter => (this.$store.state.filter = filter)
    );
    eventBus.$on("clearCompletedTodos", () => this.clearCompletedButton());
  },
  beforeDestroy() {
    //eventBus.$off("removedTodo", index => this.removeTodo(index));
    //eventBus.$off("finishedEdit", data => this.finishedEdit(data));
    eventBus.$off("checkAllChanged", checked => this.checkAllTodos(checked));
    eventBus.$off(
      "filterChanged",
      filter => (this.$store.state.filter = filter)
    );
    eventBus.$off("clearCompletedTodos", () => this.clearCompletedButton());
  },
  computed: {
    remaining() {
      //return this.$store.state.todos.filter(todo => !todo.completed).length;
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.$store.state.todos.push({
        id: this.newIdForTodo,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
      this.newIdForTodo++;
    },
    // removeTodo(id) {
    //   const index = this.$store.todos.findIndex(item => item.id == id);
    //   return this.$store.state.todos.splice(index, 1);
    // },

    // editTodo(todo) {
    //   this.beforeEditCache = todo.title;
    //   todo.editing = true;
    // },
    // doneEditingTodo(todo) {
    //   if (todo.title.trim().length === 0) {
    //     todo.title = this.beforeEditCache;
    //   }
    //   todo.editing = false;
    // },

    // cancdelEdit(todo) {
    //   todo.editing = false;
    //   todo.title = this.beforeEditCache;
    // },

    // checkAllTodos() {
    //   this.$store.state.filter.forEach(
    //     todo => (todo.completed = event.target.checked)
    //   );
    // },
    clearCompletedButton() {
      this.$store.state.filter = this.$store.state.filter.filter(
        todo => !todo.completed
      );
    }
    // finishedEdit(data) {
    //   const index = this.$store.state.todos.findIndex(
    //     item => item.id == data.id
    //   );
    //   this.$store.state.todos.splice(data.index, 1, data.todo);
    // }
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");
.rootClass {
  font-size: 20px;
  text-align: left;
}
.todoItems {
  margin-bottom: 12px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.remove-item {
  cursor: pointer;
}
.hiddenInput {
  color: black;
}
.todo_input {
  width: 100%;
  padding: 20px 20px;
  font-size: 18px;
  margin-bottom: 16px;
  margin-top: 20px;
  color: black;
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  margin-left: 12px;
  border: 1px solid white;
}
.todo-item-edit {
  font-size: 24px;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid black;
  outline: none;
}
/* input.itemCheckbox {
  margin-left: 20px;
} */
.todoItemList {
  margin-left: 20px;
}
.completed {
  text-decoration: line-through;
  color: red;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid grey;
  padding-top: 14px;
  margin-bottom: 14px;
  /* color: black; */
}
.active {
  background-color: green;
  border: 1px solid green;
  color: black;
}
.todoBtn {
  border: none;
  color: black;
}
.clearBtn {
  transition-timing-function: ease-in-out;
}
</style>
