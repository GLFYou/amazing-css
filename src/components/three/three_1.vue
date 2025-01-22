<template>
  <div class="three-wrap"><div id="box" class="w-100vw h-100vh"></div></div>
</template>
<script setup>
import { onMounted } from 'vue'
import createThree from './components/blendingColor.js'
onMounted(() => {
  createThree()
})
</script>

<style lang="scss" scoped>
.three-wrap {
}
</style>
