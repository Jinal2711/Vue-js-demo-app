<template>
  <div class="hello">
    <div class="container-fluid" v-if="this.mobileData.length>0">
      <extra-info v-for="mob in mobileData" :key="mob" v-bind:extraInfo="mob"/>
    </div>
  </div>
</template>

<script>
import ExtraInfo from "./extraInfo.vue";
export default {
  name: "HelloWorld",
  components: {
    "extra-info": ExtraInfo
  },
  data: function() {
    return {
      mobileData: []
    };
  },
  mounted() {
    fetch("https://api.myjson.com/bins/mh98g")
      .then(res => res.json())
      .then(data => (this.mobileData = data));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* body {
  background-color: black;
}
.hello {
  color: white !important;
} */
</style>
