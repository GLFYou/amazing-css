<template>
  <div class="bbl-container"></div>
</template>
<script setup>
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import { onBeforeUnmount, onMounted } from 'vue'

const create3d = () => {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.querySelector('.bbl-container').appendChild(canvas)

  // 创建引擎，参数2为是否开启抗锯齿
  const engine = new BABYLON.Engine(canvas, true)
  // 创建场景
  const scene = new BABYLON.Scene(engine)
  // 创建相机
  const camera = new BABYLON.ArcRotateCamera(
    'camera', // 相机名
    0, // 纵轴角度
    0, // 横轴角度
    10, // 相机与物体距离
    BABYLON.Vector3.Zero(), // 相机焦点，设为原点
    scene // 相机所在场景
  )
  // 把相机附加到画布上
  camera.attachControl(canvas)
  // 创建球
  // const sphere = BABYLON.MeshBuilder.CreateSphere(
  //   'sphere', // 名字
  //   { diameter: 4 }, // 半径
  //   scene // 相机所在场景
  // )

  // 创建光源
  const light = new BABYLON.DirectionalLight(
    'light', // 名字
    new BABYLON.Vector3(0, -1, 0), // 光源方向
    scene // 光源所在场景
  )
  const light2 = new BABYLON.DirectionalLight(
    'light2', // 名字
    new BABYLON.Vector3(5, 5, 5), // 光源方向
    scene // 光源所在场景
  )
  // 渲染场景
  engine.runRenderLoop(() => {
    scene.render()
  })
  // 适配屏幕，外层容器不能设置宽高，否则失效
  window.addEventListener('resize', () => {
    console.log('resize')
    engine.resize()
  })

  // 设置相机位置
  camera.setPosition(new BABYLON.Vector3(0, 0, -15))

  // // 创建地面
  // const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
  // // 创建平面
  // const plane = BABYLON.MeshBuilder.CreatePlane('plane', { width: 6, height: 6 }, scene)
  // 创建立方体
  const box = BABYLON.MeshBuilder.CreateBox('box', { width: 5, height: 5, depth: 5 }, scene)
  // // 创建圆柱体
  // const cylinder = BABYLON.MeshBuilder.CreateCylinder('cylinder', { height: 10, diameter: 5 }, scene)
  // // 创建圆锥体，tessellation为细分
  // const cone = BABYLON.MeshBuilder.CreateCylinder('cone', { diameterTop: 0, diameterBottom: 12, tessellation: 64, height: 13 }, scene)
  // // 创建圆环
  // const torus = BABYLON.MeshBuilder.CreateTorus('torus', { thickness: 3, diameter: 16, tessellation: 32 }, scene)

  // 物体移动
  // // 位置
  // box.position.set(5, 5, 5)
  // // 旋转，沿着自身的轴
  // box.rotation.set(Math.PI / 2, 0, 0)
  // // 围绕某个点旋转
  // box.rotateAround(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(1, 0, 0), Math.PI / 4)
  // // 缩放
  // box.scaling.set(0.7, 0.7, 0.1)

  // 光线
  // 点光源
  const pointLight = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(-50, -15, -15), scene)
  // 设置漫光源颜色
  pointLight.diffuse = new BABYLON.Color3(0.5, 0, 0.5)
  // 设置镜面反色光颜色
  pointLight.specular = new BABYLON.Color3(1, 0, 0)
  // 光源强度
  pointLight.intensity = 0.2

  // 聚光灯
  const spotLight = new BABYLON.SpotLight(
    'spotLight',
    new BABYLON.Vector3(0, 6, -6), // 位置
    new BABYLON.Vector3(0, -6, 6), // 方向
    Math.PI / 3, // 角度
    10, // 衰减指数
    scene
  )
  spotLight.diffuse = new BABYLON.Color3(0, 1, 0)

  // 阴影
  // // 生成阴影
  // const shadowGen = new BABYLON.ShadowGenerator(512, spotLight)
  // // 投射阴影
  // shadowGen.addShadowCaster(sphere)
  // // 接收阴影
  // box.receiveShadows = true

  // 材质
  // 创建材质
  const boxMaterial = new BABYLON.StandardMaterial('boxMaterial', scene)
  // 将box的材质设置为boxMaterial
  box.material = boxMaterial
  // // 设置材质的漫反射颜色，上述“光线及颜色”将spotLight的漫反射光颜色设置为绿色，若材质漫反射颜色无绿色则无法看到光
  // boxMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0.5)
  // // 材质高光颜色
  // boxMaterial.specularColor = new BABYLON.Color3(1, 0, 0)
  // // 材质自发光颜色
  // boxMaterial.emissiveColor = new BABYLON.Color3(0.7, 0.2, 0.4)
  // // 材质环境光颜色，需要设置场景环境光
  // scene.ambientColor = new BABYLON.Color3(1, 1, 1)
  // boxMaterial.ambientColor = new BABYLON.Color3(0.1, 0.3, 0.3)
  // // 场景的背景光
  // scene.clearColor = new BABYLON.Color3(0.4, 0.4, 0.7)

  // 纹理图片
  boxMaterial.diffuseTexture = new BABYLON.Texture('./src/assets/images/textures/uni.jpg', scene)

  // // 模型加载及动画
  // let animation
  // BABYLON.SceneLoader.Append('./src/assets/models/', 'BrainStem.glb', scene, (gltf) => {
  //   console.log(gltf.animationGroups[0])
  //   animation = gltf.animationGroups[0]
  //   animation.speedRatio = 0.5 // 控制播放倍速
  // })
  // // 双击播放、暂停动画
  // window.addEventListener('dblclick', () => {
  //   if (animation._isPaused) {
  //     animation.play()
  //   } else {
  //     animation.pause()
  //   }
  // })
  // 坐标轴,x红，y绿，z蓝
  const axesViewer = new BABYLON.AxesViewer(scene, 5)

  // 音乐加载
  const myMusic = new BABYLON.Sound('mhwt', './src/assets/music/mohewuting.mp3', scene, () => {}, { loop: true, autoplay: false })

  console.log('box:', box)
}

onMounted(() => {
  create3d()
  console.log('%c请勿打开控制台!', 'color:red;font-size:30px;margin:50px;padding:10px;border:5px solid aqua;border-radius:10px;')
})
</script>

<style lang="scss" scoped>
.bbl-container {
  // width: 100vw;
  // height: 100vh;
  background-color: rgb(217, 146, 226);
  // overflow: hidden;
}
</style>
