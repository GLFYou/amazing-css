<template>
  <div class="test-wrap w-[100vw] mt-[5vh] p-[5vw]">
    <input type="file" accept="image/*" id="fileInput" @change="fileChange" />
    <canvas ref="canvasRef" class="border w-[50vw]"></canvas>
    <button @click="compress">压缩</button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const canvasRef = ref(null)
const img = ref(null)
onMounted(() => {
  init()
})
const init = () => {
  const throttle = (fn, delay) => {
    let timer = null
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
.test-wrap {
  color: red;
  font-size: 20px;
  text-align: center;
}
</style>
