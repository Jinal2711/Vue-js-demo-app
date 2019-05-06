
<script>
export default {
  name: "MyWorld",
  props: ["extraInfo"],
  data: function() {
    return {
      showExtraInfo: false
    };
  },
  methods: {
    showMetaData: function() {
      this.showExtraInfo = !this.showExtraInfo;
    }
  }
};
</script>
<template>
  <div class="col-sm-4" @click="showMetaData">
    <img :src="`/static/${ extraInfo.imageUrl }`">
    <p>{{this.extraInfo.name}}</p>
    <div v-if="this.showExtraInfo">{{this.extraInfo.snippet}}</div>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
