<template>
  <div class="dinosaur-game-container" ref="pixiRef"></div>
</template>

<script setup>
import * as PIXI from 'pixi.js'
import { GlowFilter, OutlineFilter, ShockwaveFilter } from 'pixi-filters'
import pixelFont from '../../assets/fonts/pixel-font.ttf'
import gameTex from '../../assets/images/textures/game.png'

const pixiRef = ref(null)

// 创建Pixi
const createPixi = () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#888',
    antialias: true
  })
  pixiRef.value.appendChild(app.view)
  const container = new PIXI.Container()
  app.stage.addChild(container)

  // 添加恐龙精灵
  const baseTex = PIXI.BaseTexture.from(gameTex)
  const dinoTex = new PIXI.Texture(baseTex, new PIXI.Rectangle(75, 0, 89, 100))
  const dinosaurSp = new PIXI.Sprite(dinoTex)
  // dinosaur.visible = false // 不可见
  dinosaurSp.x = 200
  dinosaurSp.y = window.innerHeight - 87
  dinosaurSp.anchor.set(0, 1)
  container.addChild(dinosaurSp)

  // 恐龙跑步动画
  const dinoRunTex = []
  dinoRunTex.push(new PIXI.Texture(baseTex, new PIXI.Rectangle(1855, 0, 86, 100)))
  dinoRunTex.push(new PIXI.Texture(baseTex, new PIXI.Rectangle(1943, 0, 86, 100)))
  const dinoRunAni = new PIXI.AnimatedSprite(dinoRunTex)
  dinoRunAni.animationSpeed = 0.1
  dinoRunAni.play()
  dinoRunAni.visible = false
  dinoRunAni.x = 200
  dinoRunAni.y = window.innerHeight - 87
  dinoRunAni.anchor.set(0, 1)
  container.addChild(dinoRunAni)

  // 恐龙跳跃精灵
  const dinoJumpTex = new PIXI.Texture(baseTex, new PIXI.Rectangle(1678, 0, 88, 96))
  const dinoJumpSp = new PIXI.Sprite(dinoJumpTex)
  dinoJumpSp.visible = false
  dinoJumpSp.x = 200
  dinoJumpSp.y = window.innerHeight - 90
  dinoJumpSp.anchor.set(0, 1)
  container.addChild(dinoJumpSp)

  // 地面精灵
  const groundTex = new PIXI.Texture(baseTex, new PIXI.Rectangle(2, 104, 2400, 26))
  const groundSp = new PIXI.TilingSprite(groundTex, window.innerWidth, 26)
  groundSp.position.set(0, window.innerHeight - 100)
  container.addChild(groundSp)

  // 仙人掌精灵
  const cactusSp = []
  for (let i = 0; i < 6; i++) {
    const cactusTex = new PIXI.Texture(baseTex, new PIXI.Rectangle(446 + 34 * i, 0, 34, 72))
    cactusSp.push(new PIXI.Sprite(cactusTex))
  }
  cactusSp.forEach((item, index) => {
    item.x = window.innerWidth * 0.85 + index * 500
    item.y = window.innerHeight - 92
    item.anchor.set(0, 1)
    // if (index !== 0 && index !== 1) item.visible = false
    container.addChild(item)
  })
  // 开始游戏文字
  const startText = new PIXI.Text('开始游戏', {
    fontFamily: pixelFont,
    dropShadow: true,
    dropShadowAngle: 0.9,
    dropShadowColor: '#a3a3a3',
    fill: '#ffffff',
    fontSize: 50,
    align: 'center'
  })
  startText.x = window.innerWidth / 2
  startText.y = window.innerHeight / 3
  startText.anchor.set(0.5)
  container.addChild(startText)
  startText.interactive = true
  startText.on('click', () => {
    playGame()
  })

  // 比分文字
  let score = 0
  const scoreText = new PIXI.Text(`得分: ${score}`, {
    fontFamily: pixelFont,
    dropShadow: true,
    dropShadowAngle: 0.9,
    dropShadowColor: '#a3a3a3',
    fill: '#ffffff',
    fontSize: 50,
    align: 'center'
  })
  scoreText.x = window.innerWidth / 2
  scoreText.y = window.innerHeight / 3
  scoreText.anchor.set(0.5)
  scoreText.visible = false
  container.addChild(scoreText)
  // 重新开始文字
  const reGameText = new PIXI.Text('重新开始游戏', {
    fontFamily: pixelFont,
    dropShadow: true,
    dropShadowAngle: 0.9,
    dropShadowColor: '#a3a3a3',
    fill: '#ffffff',
    fontSize: 50,
    align: 'center'
  })
  reGameText.x = window.innerWidth / 2
  reGameText.y = window.innerHeight / 1.8
  reGameText.anchor.set(0.5)
  reGameText.visible = false
  reGameText.interactive = true
  container.addChild(reGameText)

  let isGaming = false
  // 开始游戏
  const playGame = () => {
    isGaming = true
    dinosaurSp.visible = false
    dinoRunAni.visible = true
    startText.visible = false
    scoreText.visible = true
  }

  // 游戏结束
  const gameOver = () => {
    isGaming = false
    scoreText._text = `GAME OVER\n 您的得分为: ${score}`
    scoreText.updateText()
    reGameText.visible = true
    reGameText.on('click', () => {
      console.log('restart')
      reGameText.visible = false
      dinoJumpSp.visible = false

      score = 0
      scoreText._text = `得分: ${score}`
      scoreText.updateText()
      // 重置仙人掌位置
      cactusSp.forEach((item, index) => {
        item.x = window.innerWidth * 0.85 + index * 500
        item.y = window.innerHeight - 92
      })
      // 重置恐龙位置
      dinosaurSp.x = 200
      dinosaurSp.y = window.innerHeight - 87
      dinoRunAni.x = 200
      dinoRunAni.y = window.innerHeight - 87
      dinoJumpSp.x = 200
      dinoJumpSp.y = window.innerHeight - 90
      playGame()
    })
  }

  // let firstTime = true
  let newPoint = true
  let gravity = 0.2
  let jumpSpeed = 15
  let runSpeed = 4
  // 游戏循环运行
  app.ticker.add((delta) => {
    if (isGaming) {
      if (score >= 70) {
        runSpeed = 16.5
        gravity = 0.46
      } else if (score >= 65) {
        runSpeed = 16.2
      } else if (score >= 60) {
        runSpeed = 16
        gravity = 0.45
      } else if (score >= 55) {
        runSpeed = 15
      } else if (score >= 50) {
        runSpeed = 14
        gravity = 0.42
      } else if (score >= 45) {
        runSpeed = 13
      } else if (score >= 40) {
        runSpeed = 12
        gravity = 0.4
      } else if (score >= 35) {
        runSpeed = 11
      } else if (score >= 30) {
        runSpeed = 10
        gravity = 0.35
      } else if (score >= 25) {
        runSpeed = 9
      } else if (score >= 20) {
        runSpeed = 8
        gravity = 0.3
      } else if (score >= 15) {
        runSpeed = 7
      } else if (score >= 10) {
        runSpeed = 6
        gravity = 0.25
      } else if (score >= 5) {
        runSpeed = 5
      }
      // 地面移动
      groundSp.tilePosition.x -= delta * runSpeed
      // 仙人掌移动
      cactusSp.forEach((item, index) => {
        item.x -= delta * runSpeed
        if (item.x < 0) {
          item.x = 500 * 6
          newPoint = true
        }

        // 判断得分或失败
        if (item.x <= 250 && item.x >= 180) {
          if (dinoJumpSp.y < item.y - 68) {
            if (newPoint) {
              score++
              scoreText._text = `得分: ${score}`
              scoreText.updateText()
              newPoint = false
            }
          } else {
            console.log('no')
            gravity = 0.2
            runSpeed = 4
            gameOver()
          }
        }
      })
      // 是否跳跃
      if (dinoJumpSp.visible) {
        jumpSpeed -= gravity
        dinoJumpSp.y -= jumpSpeed * delta
        if (dinoJumpSp.y >= window.innerHeight - 90) {
          dinoJumpSp.y = window.innerHeight - 90
          jumpSpeed = 15
          dinoJumpSp.visible = false
          dinoRunAni.visible = true
        }
      }
    }
  })
  // 跳跃
  // let allowJump = true

  // let isDown = false
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      dinoRunAni.visible = false
      dinoJumpSp.visible = true
    }
  })
}

onMounted(() => {
  createPixi()
})
</script>

<style lang="scss" scoped>
.dinosaur-game-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
