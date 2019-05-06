<template>
  <div>
    <label>
      <!-- <input type="checkbox" :checked="anyRemaining" @change="checkAllTodos"> Check All -->
      <input type="checkbox" :checked="anyRemaining" @change="allChecked"> Check All
    </label>
  </div>
</template>

<script>
export default {
  name: "todo-check-all",
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  // props: {
  //   anyRemaining: {
  //     type: Boolean,
  //     required: true
  //   }
  // },
  methods: {
    allChecked() {
      //eventBus.$emit("checkAllChanged", this.anyRemaining);
      this.$store.state.todos.forEach(
        todo => (todo.completed = event.target.checked)
      );
    }
  }
};
</script>

