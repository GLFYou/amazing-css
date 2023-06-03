<template>
  <div class="gsap-pixi-container" ref="pixiRef">
    <div class="login-container">
      <form class="login-form">
        <input type="text" class="login-input" placeholder="Username" />
        <input type="password" class="login-input" placeholder="Password" />
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>
<script setup>
// import * as PIXI from 'pixi.js'
// import { gsap } from 'gsap'
// import { PixiPlugin } from 'gsap/PixiPlugin'
// gsap.registerPlugin(PixiPlugin)
// PixiPlugin.registerPIXI(PIXI)

const pixiRef = ref(null)
// const createPixi = () => {
//   const app = new PIXI.Application({
//     width: window.innerWidth,
//     height: window.innerHeight,
//     background: 0xffffff,
//     antialias: true
//   })
//   pixiRef.value.appendChild(app.view)

//   const container = new PIXI.Container()
//   app.stage.addChild(container)
//   // 创建一个圆形
//   const circle = new PIXI.Graphics()
//   circle.beginFill(0xff0000)
//   circle.drawCircle(100, 100, 100)
//   circle.endFill()
//   container.addChild(circle)

//   gsap.to(circle, {
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//     pixi: {
//       fillColor: 0xffffff
//     },
//     duration: 2,
//     ease: 'power2.out',
//     repeat: -1,
//     yoyo: true
//   })
// }

onMounted(() => {
  // createPixi()
})
</script>

<style lang="scss" scoped>
.gsap-pixi-container {
  .login-container {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-input {
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .login-button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .login-button:hover {
    background-color: #3e8e41;
  }
}
</style>
