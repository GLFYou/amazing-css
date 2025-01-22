// 模型混合着色器
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import gsap from 'gsap'
let car, renderer, camera, scene, box, stats, gui, folder
const createThree = () => {
  stats = new Stats()
  box = document.getElementById('box')
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, box.clientWidth / box.clientHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true })
  gui = new GUI()
  folder = gui.addFolder('模型混合着色器')

  camera.position.set(20, 20, 20)
  renderer.setSize(box.clientWidth, box.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  box.appendChild(renderer.domElement)
  // box.appendChild(stats.dom)
  // 网格模型，随机生成模型------------
  // const geo = new THREE.OctahedronGeometry(5, 0)
  // const mat = new THREE.MeshBasicMaterial({
  //   color: 0x00ff00,
  //   transparent: true,
  //   opacity: 0.8
  // })
  // for (let i = 0; i < 500; i++) {
  //   const mesh = new THREE.Mesh(geo, mat)
  //   mesh.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50)
  //   scene.add(mesh)
  // }
  // 点模型-------------
  // const geo = new THREE.BufferGeometry()
  // const vertices = new Float32Array([
  //   0,
  //   0,
  //   0 //顶点1坐标
  // ])
  // const attr = new THREE.BufferAttribute(vertices, 3)
  // geo.attributes.position = attr
  // const material = new THREE.PointsMaterial({
  //   color: 0x00ff00,
  //   transparent: true,
  //   opacity: 0.8,
  //   size: 10
  // })
  // const points = new THREE.Points(geo, material)
  // scene.add(points)
  // 线模型-------------
  // const geo = new THREE.BufferGeometry()
  // const vertices = new Float32Array([
  //   0,
  //   0,
  //   0, // 顶点1
  //   10,
  //   0,
  //   0, // 顶点2
  //   10,
  //   10,
  //   0, // 顶点3
  //   0,
  //   0,
  //   0, // 顶点4
  //   10,
  //   10,
  //   0, // 顶点6
  //   0,
  //   10,
  //   0 // 顶点5
  // ])
  // const attr = new THREE.BufferAttribute(vertices, 3)
  // geo.attributes.position = attr
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0xeeff00,
  //   side: THREE.DoubleSide
  // })
  // const points = new THREE.Mesh(geo, material)
  // scene.add(points)
  // 局部坐标世界坐标--------------
  // const geo = new THREE.BoxGeometry(10, 10, 10)
  // const mat = new THREE.MeshBasicMaterial({
  //   color: 0x00ff00
  // })
  // const wireframe = new THREE.WireframeGeometry(geo)
  // const line = new THREE.LineSegments(wireframe)
  // const group = new THREE.Group()
  // group.add(line)
  // scene.add(group)
  // line.position.set(10, 0, 0)
  // line.geometry.translate(20, 0, 0)
  // group.position.set(10, 0, 0)
  // console.log(line.position)
  // const worldPos = new THREE.Vector3()
  // line.getWorldPosition(worldPos)
  // console.log(worldPos)
  // line.position.set(10, 10, 0)
  // line.rotation.set(0, Math.PI / 4, 0)
  // gsap.to(line.rotation, { duration: 5, y: Math.PI * 2, repeat: -1, ease: 'none' })
  // 纹理贴图--------------
  const sphere = new THREE.PlaneGeometry(20, 10)
  const texLoader = new THREE.TextureLoader()
  const uvs = new Float32Array([0, 0.5, 0.5, 0.5, 0, 0, 0.5, 0])
  // sphere.attributes.uv = new THREE.BufferAttribute(uvs, 2)

  const tex = texLoader.load('./images/textures/uni.jpg')

  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  gsap.to(tex.offset, {
    x: 1,
    duration: 1,
    repeat: -1,
    ease: 'none'
  })
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(sphere, mat)
  scene.add(mesh)
  const gridHelper = new THREE.GridHelper(100, 100, 0x00ffff, 0x009999)
  scene.add(gridHelper)
  // -------------------
  new OrbitControls(camera, renderer.domElement)
  window.onresize = () => {
    renderer.setSize(box.clientWidth, box.clientHeight)
    camera.aspect = box.clientWidth / box.clientHeight
    camera.updateProjectionMatrix()
  }

  scene.add(new THREE.AmbientLight(0xffffff, 3))
  scene.add(new THREE.AxesHelper(1000))
  animate()
}

function animate() {
  requestAnimationFrame(animate)
  car?.render?.()
  stats.update()
  renderer.render(scene, camera)
}

export default createThree
