<template>
  <button
    v-if="showClearCompletedButton"
    :class="{clearBtn: clearCompletedButton}"
    @click="clearCompletedButton"
  >Clear completed</button>
</template>
<script>
export default {
  name: "clear-completed",
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompletedButton() {
      eventBus.$emit("clearCompletedTodos");
    }
  }
};
</script>

