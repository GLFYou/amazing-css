import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import * as CANNON from 'cannon'

export default class {
  constructor(parentEle) {
    this.scene = null
    this.camera = null
    this.engine = null
    this.canvas = null
    this.initBBL(parentEle)
  }

  initBBL(parentEle) {
    // const canvas = document.createElement('canvas')
    this.canvas = document.querySelector('.bbl-canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight - 10
    // document.querySelector(parentEle).appendChild(canvas)
    // 创建引擎，参数2为是否开启抗锯齿
    this.engine = new BABYLON.Engine(this.canvas, true)
    // 创建场景
    this.createScene()
    // 创建相机
    this.createArcRotateCamera()
    // this.createFreeCamera()
    // 渲染场景
    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    // 适配屏幕，外层容器不能设置宽高，或overflow:hidden,否则失效
    window.addEventListener('resize', () => {
      console.log('resize')
      this.engine.resize()
    })
  }

  // 创建场景
  createScene() {
    this.scene = new BABYLON.Scene(this.engine)
    this.scene.onPointerDown = (e) => {
      if (e.button === 0) {
        this.engine.enterPointerlock()
      }
      if (e.button === 1) {
        this.engine.exitPointerlock()
      }
    }
    // 物理引擎cannon加持
    this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin(true, 10, CANNON))
    // 第一人称视角
    // const framesPerSecond = 60 // 每秒帧数
    // const gravity = -9.81 // 重力
    // this.scene.gravity = new BABYLON.Vector3(0, gravity / framesPerSecond, 0) // 场景重力
    // this.scene.collisionsEnabled = true // 碰撞监测
  }

  // 创建旋转相机
  createArcRotateCamera() {
    this.camera = new BABYLON.ArcRotateCamera(
      'camera', // 相机名
      Math.PI / 4, // 纵轴角度
      Math.PI / 4, // 横轴角度
      50, // 相机与物体距离
      BABYLON.Vector3.Zero(), // 相机焦点，设为原点
      this.scene // 相机所在场景
    )
    this.camera.wheelPrecision = 300 // 改变鼠标滚轮缩放倍率
    this.camera.minZ = 0.1 // 相机裁切画面的最小距离

    // this.camera.lowerRadiusLimit = 1.4
    // this.camera.upperRadiusLimit = 7
    // // this.camera.useBouncingBehavior = true // 缩放超出范围会弹跳复原
    // this.camera.useAutoRotationBehavior = true // 相机自动旋转
    // this.camera.autoRotationBehavior.zoomStopsAnimation = true // 在缩放时停止旋转
    // this.camera.autoRotationBehavior.idleRotationSpeed = 0.5 // 相机旋转速度
    // this.camera.autoRotationBehavior.idleRotationWaitTime = 4000 // 停止操作多久后开始旋转，ms
    // this.camera.autoRotationBehavior.idleRotationSpinupTime = 2000 // 开始旋转需要多久后到达旋转速度，ms
    // this.camera.lowerBetaLimit = Math.PI / 6 // 相机上下旋转范围
    // this.camera.upperBetaLimit = Math.PI / 1.2 // 相机上下旋转范围

    // this.camera.useFramingBehavior = true // 初次加载时启用特写放大效果，需要将camera的target设置为mesh，且禁止平移会失效
    // this.camera.framingBehavior.radiusScale = 1.4 // 放大至距离物体多远距离
    // this.camera.framingBehavior.framingTime = 3000 // 放大过渡时间
    // this.camera.panningSensibility = 0 // 平移功能，为0禁用

    // this.engine.displayLoadingUI()// 添加加载动画
    // this.camera = new BABYLON.FreeCamera(' FreeCamera', new BABYLON.Vector3(0, 30, -30), this.scene)

    this.camera.attachControl(this.canvas) // 把相机附加到画布上
  }

  // 创建自由相机
  createFreeCamera() {
    this.camera = new BABYLON.FreeCamera('FreeCamera', new BABYLON.Vector3(0, 3, 0), this.scene)
    // this.camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(0, 0.5, -5), this.scene)
    this.camera.attachControl(this.canvas)
    this.camera.applyGravity = true
    this.camera.checkCollisions = true
    this.camera.ellipsoid = new BABYLON.Vector3(2, 2, 2)
    this.camera.minZ = 0.45
    this.camera.speed = 0.3
    this.camera.angularSensibility = 4000

    this.camera.keysUp.push(87) // W
    this.camera.keysDown.push(83) // S
    this.camera.keysLeft.push(65) // A
    this.camera.keysRight.push(68) // D
  }

  // 创建坐标轴，x红，y绿，z蓝
  createAxis() {
    const axesViewer = new BABYLON.AxesViewer(this.scene, 5)
  }

  // 灯光
  addLight(x, y, z, intensity) {
    const pointLight = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(x, y, z), this.scene)
    pointLight.intensity = intensity
  }

  // 模型
  createGround(width, height) {
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width, height }, this.scene)
    return ground
  }

  createBox(width, height, depth) {
    const box = BABYLON.MeshBuilder.CreateBox('box', { width, height, depth }, this.scene)
    return box
  }

  createBall(segments, diameter) {
    const ball = BABYLON.MeshBuilder.CreateSphere('sphere', { segments, diameter }, this.scene)
    return ball
  }

  // 创建地面材质
  createGroundMat(mesh) {
    const texArr = []
    const groundMat = new BABYLON.StandardMaterial('groundMat', this.scene)
    const diffuseTex = new BABYLON.Texture('./src/assets/images/textures/ground/slate_driveway_diff_1k.jpg')
    const normalTex = new BABYLON.Texture('./src/assets/images/textures/ground/slate_driveway_nor_dx_1k.jpg')
    const aoTex = new BABYLON.Texture('./src/assets/images/textures/ground/slate_driveway_ao_1k.jpg')
    // const displaceTex = new BABYLON.Texture('./src/assets/images/textures/ground/slate_driveway_disp_1k.jpg')
    texArr.push(diffuseTex, normalTex, aoTex)

    groundMat.diffuseTexture = diffuseTex
    groundMat.bumpTexture = normalTex
    groundMat.ambientTexture = aoTex
    // groundMat.specularTexture = displaceTex

    texArr.forEach((item) => {
      item.uScale = 4
      item.vScale = 4
    })
    mesh.material = groundMat
  }

  // 创建金属材质
  createMetalMat(mesh) {
    const texArr = []
    const mat = new BABYLON.StandardMaterial('metalMat', this.scene)
    // 漫反射贴图
    const diffuseTex = new BABYLON.Texture('./src/assets/images/textures/metal/metal_plate_diff_1k.jpg', this.scene)
    // 法线贴图
    const normalTex = new BABYLON.Texture('./src/assets/images/textures/metal/metal_plate_bump_1k.jpg', this.scene)
    // 环境光遮蔽贴图
    const aoTex = new BABYLON.Texture('./src/assets/images/textures/metal/metal_plate_ao_1k.jpg', this.scene)
    // 金属度贴图
    const specTex = new BABYLON.Texture('./src/assets/images/textures/metal/metal_plate_spec_1k.jpg', this.scene)

    texArr.push(diffuseTex, normalTex, specTex, aoTex)

    mat.diffuseTexture = diffuseTex
    mat.bumpTexture = normalTex
    mat.ambientTexture = aoTex
    mat.specularTexture = specTex

    mat.invertNormalMapX = true
    mat.invertNormalMapY = true
    mat.specularPower = 20
    texArr.forEach((item) => {
      item.uScale = 1.5
      item.vScale = 1.5
    })
    mesh.material = mat
  }

  // 创建沥青材质pbr
  createAsphalt(mesh) {
    const pbr = new BABYLON.PBRMaterial('pbr', this.scene)
    pbr.albedoTexture = new BABYLON.Texture('./src/assets/images/textures/asphalt/asphalt_02_diff_1k.jpg')
    pbr.bumpTexture = new BABYLON.Texture('./src/assets/images/textures/asphalt/asphalt_02_nor_gl_1k.jpg')
    pbr.metallicTexture = new BABYLON.Texture('./src/assets/images/textures/asphalt/asphalt_02_rough_1k.jpg')

    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true
    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true

    pbr.roughness = 1
    mesh.material = pbr
  }

  // 创建环境
  createEnv() {
    const envTex = BABYLON.CubeTexture.CreateFromPrefilteredData('./src/assets/images/textures/env/environment.env', this.scene)
    envTex.gammaSpace = false
    this.scene.environmentTexture = envTex
    this.scene.createDefaultSkybox(envTex, true, 1000, 0.2)

    this.scene.environmentIntensity = 0.7
  }

  // 模型加载，油桶
  async createBarrel(modelName, scale) {
    // 同步方式
    // BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', 'barrel.glb', this.scene, (mesh) => {
    //   console.log('mesh: ', mesh)
    // })
    // 异步方式
    const models = await BABYLON.SceneLoader.ImportMeshAsync('', './src/assets/models/', modelName + '.glb', this.scene, (e) => {
      console.log(e)
    })

    models.meshes[0].scaling = new BABYLON.Vector3(scale, scale, scale) // 在x、y和z轴上均放大2倍
    models.meshes[0].position.y = 1
    // this.engine.hideLoadingUI() // 模型加载完毕，隐藏加载动画

    // this.camera.target = models.meshes[2]

    // 模型开启碰撞监测
    models.meshes.forEach((item) => (item.checkCollisions = true))
  }

  // 灯光操纵杆
  CreateGizmos(customLight) {
    const lightGizmo = new BABYLON.LightGizmo()
    lightGizmo.scaleRatio = 2
    lightGizmo.light = customLight
    const gizmoManager = new BABYLON.GizmoManager(this.scene)
    gizmoManager.positionGizmoEnabled = true
    gizmoManager.rotationGizmoEnabled = true
    gizmoManager.usePointerToAttachGizmos = false
    gizmoManager.attachToMesh(lightGizmo.attachedMesh)
  }

  // 半球形灯光
  createHemiLight(intensity, showGizmos) {
    const hemiLight = new BABYLON.HemisphericLight('hemiLight', new BABYLON.Vector3(0, 1, 0), this.scene)
    hemiLight.intensity = intensity
    hemiLight.diffuse = new BABYLON.Color3(0, 0, 1) // 漫反射光
    hemiLight.groundColor = new BABYLON.Color3(1, 0, 0) // 地面光，即漫反射照不到的
    hemiLight.specular = new BABYLON.Color3(0, 1, 0) // 高光

    if (showGizmos) this.CreateGizmos(hemiLight)
  }

  // 平行光
  createDirectLight(showGizmos) {
    const directLight = new BABYLON.DirectionalLight('directLight', new BABYLON.Vector3(0, -1, 0), this.scene)

    if (showGizmos) this.CreateGizmos(directLight)
  }

  // 点光源
  createPointLight(showGizmos) {
    const pointLight = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(0, 5, 0), this.scene)

    if (showGizmos) this.CreateGizmos(pointLight)

    return pointLight
  }

  // 聚光灯，且生成阴影
  createSpotLight({ px, py, pz }, { dx, dy, dz }, angle, distance, showGizmos, meshArr) {
    const spotLight = new BABYLON.SpotLight('spotLight', new BABYLON.Vector3(px, py, pz), new BABYLON.Vector3(dx, dy, dz), angle, distance, this.scene)
    spotLight.shadowEnabled = true
    const shadowGen = new BABYLON.ShadowGenerator(1024, spotLight)
    // 改啥阴影质量，增加边缘模糊等
    shadowGen.useBlurExponentialShadowMap = true
    spotLight.shadowMinZ = 1
    spotLight.shadowMaxZ = 10

    meshArr.length &&
      meshArr.forEach((item) => {
        item.receiveShadows = true
        shadowGen.addShadowCaster(item)
      })

    if (showGizmos) this.CreateGizmos(spotLight)
  }

  // 创建交互
  createActions(mesh) {
    mesh.actionManager = new BABYLON.ActionManager(this.scene)
    // 无过渡效果
    mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnLeftPickTrigger, mesh, 'scaling', new BABYLON.Vector3(0.5, 0.5, 0.5)))
    // 有过渡效果，在then中还可以添加其他动作
    mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnCenterPickTrigger, mesh, 'material.roughness', 0, 2000)).then(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnCenterPickTrigger, mesh, 'material.roughness', 1, 2000))

    // 基于scene的动画，无需交互自动执行
    this.scene.actionManager = new BABYLON.ActionManager(this.scene)
    this.scene.actionManager.registerAction(new BABYLON.IncrementValueAction(BABYLON.ActionManager.OnEveryFrameTrigger, mesh, 'rotation.y', 0.01))
  }

  // 模型碰撞
  createImpostors() {
    const box = this.createBox(6, 6, 6)
    box.position = new BABYLON.Vector3(0, 20, 0)
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {
      mass: 1, // 质量
      friction: 0.5, // 摩擦力
      restitution: 0.8 // 弹性
    })

    const ground = this.createGround(40, 40)
    ground.position = new BABYLON.Vector3(0, 1.05, 0)
    this.createAsphalt(ground)
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {
      mass: 0, // 质量
      friction: 0.5, // 摩擦力
      restitution: 0.5 // 弹性
    })
  }
}
