<template>
  <div class="my-pixi-container" ref="pixiRef"></div>
</template>
<script setup>
import * as PIXI from 'pixi.js'
import { GlowFilter, OutlineFilter, ShockwaveFilter } from 'pixi-filters'

const pixiRef = ref(null)

// 创建Pixi
const createPixi = () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 'skyblue',
    antialias: true
  })
  pixiRef.value.appendChild(app.view)

  const container = new PIXI.Container()
  const carSp = PIXI.Sprite.from('./src/assets/images/textures/car.jpg')
  carSp.scale.set(1.3, 1.3)
  carSp.width = (app.screen.height * 16) / 9
  carSp.height = app.screen.height
  carSp.anchor.set(0.5)
  carSp.x = app.screen.width / 2
  carSp.y = app.screen.height / 2
  container.addChild(carSp)
  app.stage.addChild(container)

  // 添加文字
  const text = new PIXI.Text('F E R R A R I', {
    fontFamily: 'Helvetica',
    fontSize: app.screen.width / 10,
    fill: 0xffffff,
    align: 'center',
    dropShadow: true,
    dropShadowAngle: 0.9,
    dropShadowColor: '#000000'
  })
  text.x = app.screen.width / 2
  text.y = app.screen.height / 2
  text.anchor.set(0.5)
  container.addChild(text)
  // 添加置换滤镜
  const displacementSprite = PIXI.Sprite.from('./src/assets/images/textures/displacement.jpg')
  displacementSprite.scale.set(1.3)
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT // 重复贴图
  const displacementFilter = new PIXI.DisplacementFilter(displacementSprite)
  container.addChild(displacementSprite)

  // 振荡滤镜
  const shockwaveFilter1 = new ShockwaveFilter(
    [Math.random() * app.screen.width, Math.random() * app.screen.height],
    {
      radius: 200, // 波纹半径
      amplitude: 15, // 幅度
      wavelength: 30, // 波长
      speed: 10, // 速度
      brightness: 1.01 // 亮度
    },
    0
  )

  // 波浪生成
  const createWave = (waveFilter, resetTime) => {
    waveFilter.time += 0.1
    // waveFilter.amplitude += 0.01
    if (waveFilter.time > resetTime) {
      waveFilter.time = 0
      waveFilter.center = [Math.random() * app.screen.width, Math.random() * app.screen.height]
      waveFilter.radius = 50 + 150 * Math.random()
      waveFilter.speed = 5 + 5 * Math.random()
    }
  }
  container.filters = [displacementFilter, shockwaveFilter1]

  // 动画生成
  app.ticker.add(() => {
    displacementSprite.x += 0.5
    displacementSprite.y += 0.5
    createWave(shockwaveFilter1, 40)
  })

  // 点击生成波纹
  carSp.interactive = true // 开启事件触发
  carSp.on('click', (e) => {
    const clickWaveFilter = new ShockwaveFilter(
      // [e.client.x, e.client.y - (app.screen.height / 2 - carSp.height / 2)],
      [e.client.x - (app.screen.width / 2 - carSp.width / 2), e.client.y - (app.screen.height / 2 - carSp.height / 2)],
      {
        radius: 200,
        amplitude: 10,
        wavelength: 15,
        speed: 10,
        brightness: 1.01 // 亮度
      },
      0
    )
    app.ticker.add(() => {
      createWave(clickWaveFilter, 50)
    })
    if (container.filters.length >= 4) container.filters.splice(2, 1)
    container.filters.push(clickWaveFilter)
  })
}

onMounted(() => {
  createPixi()
})
</script>

<style lang="scss" scoped>
.my-pixi-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
