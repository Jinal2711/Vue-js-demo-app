<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
//import Calculator from "./components/Calculator.vue";
import Navigation from "./components/Navigation.vue";
//import TodoList from "./components/todoList.vue";
export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
