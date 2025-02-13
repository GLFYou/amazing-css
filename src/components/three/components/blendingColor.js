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
  // const pointsArr = CurvePath.getPoints(16)
  // const geometry = new THREE.BufferGeometry().setFromPoints(pointsArr)
  // const material = new THREE.LineBasicMaterial({
  //   color: 0xffffff
  // })
  // const line3 = new THREE.Line(geometry, material)
  // scene.add(line3)
  // const pointMaterial = new THREE.PointsMaterial({
  //   color: 0xffff00,
  //   size: 5
  // })
  // const point = new THREE.Points(geometry, pointMaterial)
  // scene.add(point)
  // const path = new THREE.CatmullRomCurve3([new THREE.Vector3(-50, 20, 90), new THREE.Vector3(-10, 40, 40), new THREE.Vector3(0, 0, 0), new THREE.Vector3(60, -60, 0), new THREE.Vector3(70, 0, 80)])

  // const geometry2 = new THREE.TubeGeometry(CurvePath, 50, 2, 25)
  // const material2 = new THREE.MeshLambertMaterial({
  //   color: 0x00ff00,
  //   side: THREE.DoubleSide
  // })
  // const mesh = new THREE.Mesh(geometry2, material2)
  // scene.add(mesh)

  // const curve = new THREE.SplineCurve([
  //   new THREE.Vector2(0, 50),
  //   new THREE.Vector2(10, 50),
  //   new THREE.Vector2(8, 40),
  //   new THREE.Vector2(15, 35),
  //   new THREE.Vector2(18, 30),
  //   new THREE.Vector2(15, 25),
  //   new THREE.Vector2(8, 15),
  //   new THREE.Vector2(15, 10),
  //   new THREE.Vector2(10, 0),
  //   new THREE.Vector2(0, 0)
  // ])
  // const points = curve.getPoints(50)
  // const pointGeo = new THREE.BufferGeometry().setFromPoints(points)
  // const pointMe = new THREE.Points(
  //   pointGeo,
  //   new THREE.PointsMaterial({
  //     color: 0xffff00,
  //     size: 2
  //   })
  // )
  // scene.add(pointMe)

  // const latheGeo = new THREE.LatheGeometry(points, 50)
  // const lathe = new THREE.Mesh(
  //   latheGeo,
  //   new THREE.MeshLambertMaterial({
  //     color: 0x00ff00,
  //     side: THREE.DoubleSide
  //   })
  // )
  // scene.add(lathe)

  // const extrudeGeo = new THREE.ExtrudeGeometry(new THREE.Shape(curve.getPoints(500)), {
  //   curveSegments: 50,
  //   depth: 10,
  //   bevelThickness: 1,
  //   bevelSegments: 10
  // })
  // const extrude = new THREE.Mesh(
  //   extrudeGeo,
  //   new THREE.MeshLambertMaterial({
  //     color: 0x00ff00,
  //     side: THREE.DoubleSide
  //   })
  // )
  // scene.add(extrude)

  // const loader = new GLTFLoader()
  // loader.load('./models/建筑模型.gltf', (gltf) => {
  //   // scene.add(gltf.scene)
  //   gltf.scene.traverse((obj) => {
  //     if (obj.isMesh) {
  //       obj.material = new THREE.MeshLambertMaterial({
  //         color: 0x004444,
  //         transparent: true,
  //         opacity: 0.5
  //       })
  //       const edges = new THREE.EdgesGeometry(obj.geometry)
  //       const edgesMaterial = new THREE.LineBasicMaterial({
  //         color: 0x00ffff
  //       })
  //       const line = new THREE.LineSegments(edges, edgesMaterial)
  //       obj.add(line)
  //     }
  //     scene.add(gltf.scene)
  //   })
  // })

  // const loader = new GLTFLoader()
  // loader.load('./models/地形.glb', (gltf) => {
  //   const mesh = gltf.scene.children[0]
  //   const pos = mesh.geometry.attributes.position
  //   const c1 = new THREE.Color(0x0000ff)
  //   const c2 = new THREE.Color(0xff0000)
  //   const colorArr = []
  //   for (let i = 0; i < pos.count; i++) {
  //     const c = c1.clone().lerp(c2, pos.getY(i) / 100)
  //     colorArr.push(c.r, c.g, c.b)
  //   }
  //   const colors = new Float32Array(colorArr)

  //   mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3)
  //   mesh.material = new THREE.MeshLambertMaterial({
  //     vertexColors: true
  //   })
  //   scene.add(gltf.scene)
  // })

  const loader = new GLTFLoader()
  loader.load('./models/地形.glb', (gltf) => {
    const mesh = gltf.scene.children[0]

    scene.add(gltf.scene)
  })

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
