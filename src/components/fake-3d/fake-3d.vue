<template>
  <div class="fake3d-container">
    <canvas class="zdog-canvas" width="240" height="240"></canvas>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import * as Zdog from 'zdog'

onMounted(() => {
  const illo = new Zdog.Illustration({ element: '.zdog-canvas' })

  // add circle
  const ellipse = new Zdog.Ellipse({
    addTo: illo,
    diameter: 80,
    stroke: 20,
    color: 'red',
    translate: { z: -30 }
  })

  const rect = new Zdog.Rect({
    addTo: illo,
    width: 50,
    height: 50,
    stroke: 20,
    color: 'aqua',
    fill: true,
    translate: {
      z: 30
    }
  })
  // 更新、渲染
  illo.updateRenderGraph()

  // 动画
  function animate() {
    illo.rotate.y += 0.01
    illo.rotate.z += 0.005
    illo.updateRenderGraph()
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<style lang="scss" scoped>
.fake3d-container {
  background-color: aqua;
  // width: 50vw;
  width: vw(10);
  .zdog-canvas {
  }
}
</style>
