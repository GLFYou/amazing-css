<template>
  <div class="gsap-pixi-container" ref="pixiRef"></div>
</template>
<script setup>
import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const pixiRef = ref(null)
const createPixi = () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    background: 0xffcccc,
    antialias: true
  })
  pixiRef.value.appendChild(app.view)

  const container = new PIXI.Container()
  app.stage.addChild(container)
  // 创建一个圆形
  const circle = new PIXI.Graphics()
  circle.beginFill(0xff0000)
  circle.drawCircle(100, 100, 100)
  circle.endFill()
  container.addChild(circle)

  gsap.to(circle, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    pixi: {
      fillColor: 0xffffff
    },
    duration: 2,
    ease: 'power2.out',
    repeat: -1,
    yoyo: true
  })
}

onMounted(() => {
  createPixi()
})
</script>

<style lang="scss" scoped>
.gsap-pixi-container {
}
</style>
