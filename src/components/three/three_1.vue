<template>
  <div class="three-wrap"><div id="box" class="w-100vw h-100vh"></div></div>
  <div class="absolute m-4 p-2 top-4 bg-dark-50">
    <button @click="download">下载</button>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import createThree, { download } from './components/blendingColor.js'
// import createThree from './components/gltfTest'
onMounted(() => {
  createThree()
})
</script>

<style lang="scss" scoped>
.three-wrap {
}
</style>
