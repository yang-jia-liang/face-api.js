<template>
  <div id="app">
    <FaceRecognize />
  </div>
</template>

<script>
import FaceRecognize from "@/components/faceRecognize/index.vue";

export default {
  name: 'App',
  components: {
    FaceRecognize,
  }
}
</script>

<style>
  body {
    background: #efeff4;
    text-align: left;
    padding: 0 10px;
    height: 100vh;
    overflow: auto;
  }
</style>