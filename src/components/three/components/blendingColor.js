// 模型混合着色器
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import gsap from 'gsap'
let car, renderer, camera, scene, box, stats, gui, folder, controls, light
const createThree = () => {
  stats = new Stats()
  box = document.getElementById('box')
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, box.clientWidth / box.clientHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true, preserveDrawingBuffer: true })
  gui = new GUI()
  folder = gui.addFolder('模型混合着色器')

  camera.position.set(100, 100, 100)
  renderer.setSize(box.clientWidth, box.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  box.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.maxPolarAngle = Math.PI / 2.5
  controls.enableDamping = true

  light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(200, 200, 200)

  //工厂--------------
  // const textureCube = new THREE.CubeTextureLoader().setPath('./images/textures/envCube/sky/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
  // const loader = new GLTFLoader()
  // loader.load('./models/工厂.glb', (gltf) => {
  //   gltf.scene.traverse((obj) => {})
  //   scene.add(gltf.scene)
  // })
  //圆弧------------
  // const geometry = new THREE.BufferGeometry() //创建一个几何体对象
  // const R = 50 //圆弧半径
  // const N = 100 //分段数量
  // const sp = (2 * Math.PI) / N //两个相邻点间隔弧度
  // const arr = []
  // const cx = 0
  // const cy = 50
  // for (let i = 0; i < N; i++) {
  //   const angle = sp * i //当前点弧度
  //   // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
  //   const x = cx + R * Math.cos(angle)
  //   const y = cy + R * Math.sin(angle)
  //   arr.push(x, y, 0)
  // }
  // const vertices = new Float32Array(arr)
  // const attribute = new THREE.BufferAttribute(vertices, 3)
  // geometry.attributes.position = attribute
  // const matrial = new THREE.LineBasicMaterial({
  //   color: 0xffffff
  // })
  // const line = new THREE.LineLoop(geometry, matrial)
  // scene.add(line)
  //直接用api画圆--------------
  const R = 80
  const H = 200
  const line = new THREE.LineCurve(new THREE.Vector2(R, H), new THREE.Vector2(R, 0))
  const arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true)
  const line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0), new THREE.Vector2(-R, H))
  const CurvePath = new THREE.CurvePath()
  CurvePath.curves.push(line, arc, line2)
  const pointsArr = CurvePath.getPoints(16)
  const geometry = new THREE.BufferGeometry().setFromPoints(pointsArr)
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff
  })
  const line3 = new THREE.Line(geometry, material)
  scene.add(line3)
  const pointMaterial = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 5
  })
  const point = new THREE.Points(geometry, pointMaterial)
  scene.add(point)
  // -----------------
  scene.add(light)
  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  scene.add(new THREE.AxesHelper(1000))
  animate()
  window.onresize = () => {
    renderer.setSize(box.clientWidth, box.clientHeight)
    camera.aspect = box.clientWidth / box.clientHeight
    camera.updateProjectionMatrix()
  }
}

function animate() {
  requestAnimationFrame(animate)
  car?.render?.()
  stats.update()
  controls.update()
  renderer.render(scene, camera)
}

export const download = () => {
  const a = document.createElement('a')
  const canvas = renderer.domElement
  a.href = canvas.toDataURL('image/jpg')
  a.download = 'test.jpg'
  a.click()
}

export default createThree
