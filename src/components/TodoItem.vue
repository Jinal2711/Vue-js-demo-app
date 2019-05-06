<template>
  <div class="todo-item todoItems">
    <div class="todo-item-left">
      <input type="checkbox" class="itemCheckbox" v-model="completed" @change="doneEditingTodo">

      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{completed:completed}"
      >{{title}}</div>

      <input
        v-else
        type="text"
        class="todo-item-edit hiddenInput"
        v-model="title"
        v-focus
        @blur="doneEditingTodo"
        @keyup.enter="doneEditingTodo"
        @keyup.esc="cancdelEdit"
      >
    </div>
    <div>
      <button @click="pluralize" style="color:black">Plural</button>
      <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "todo-item",
  // props: ["todo", "index"]
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: this.todo.beforeEditCache
    };
  },
  created() {
    eventBus.$on("pluralize", this.handlePluralize);
  },
  beforeDestroy() {
    eventBus.$off("pluralize", this.handlePluralize);
  },
  watch: {
    checkAll() {
      if (this.checkAll) {
        this.completed = true;
      } else {
        this.completed = this.todo.completed;
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    removeTodo(id) {
      //eventBus.$emit("removedTodo", index);
      const index = this.$store.state.todos.findIndex(item => item.id == id);
      this.$store.state.todos.splice(index, 1);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEditingTodo() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;

      const index = this.$store.state.todos.findIndex(
        item => item.id == this.id
      );
      this.$store.state.todos.splice(index, 1, {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      });

      // eventBus.$emit("finishedEdit", {
      //   index: this.index,
      //   todo: {
      //     id: this.id,
      //     title: this.title,
      //     completed: this.completed,
      //     editing: this.editing
      //   }
      // });
    },
    cancdelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      eventBus.$emit("pluralize");
    },
    handlePluralize() {
      this.title = this.title + "s";
      const index = this.$store.state.todos.findIndex(
        item => item.id == this.id
      );
      this.$store.state.todos.splice(index, 1, {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      });
    }
  }
};
</script>

