import WaterDrop from '@/components/cool-css/water-drop.vue'
import CircleLight from '@/components/cool-css/circle-light.vue'
import StrokeBtn from '@/components/cool-css/stroke-btn.vue'
import BottleText from '@/components/cool-css/bottle-text.vue'
import SlidePicker from '@/components/cool-css/slide-picker.vue'
import RenderOptimization from '@/components/cool-css/render-optimization.vue'
import SvgAnimate from '@/components/cool-css/svg-animate.vue'
import Car from '@/components/pixi/car.vue'
import DinosaurGame from '@/components/pixi/dinosaur-game.vue'
import GsapPixi from '@/components/pixi/gsap-pixi.vue'
import AppleWeb from '@/components/gsap/apple-web.vue'
import Fake3d from '@/components/fake-3d/fake-3d.vue'
import ScrollSnap from '@/components/cool-css/scroll-snap.vue'
import BBL3D from '@/components/babylon/bbl.vue'
import WuJie from '@/components/wujie/WuJie.vue'
import AnimateTest from '@/components/babylon/animateTest.vue'

export default [
  { name: '水滴', id: 0, com: WaterDrop },
  { name: '圆形旋转边框', id: 1, com: CircleLight },
  { name: '炫酷边框按钮', id: 2, com: StrokeBtn },
  { name: '水瓶文字', id: 3, com: BottleText },
  { name: '滑动选择器', id: 4, com: SlidePicker },
  { name: '大数据渲染优化', id: 5, com: RenderOptimization },
  { name: 'svg动画', id: 6, com: SvgAnimate },
  { name: 'Pixi水滴特效-法拉利', id: 7, com: Car },
  { name: '恐龙小游戏', id: 8, com: DinosaurGame },
  { name: '顶部吸附滚动', id: 9, com: ScrollSnap },
  { name: 'GSAP-PixiJs', id: 10, com: GsapPixi },
  { name: 'AppleWeb', id: 11, com: AppleWeb },
  { name: '伪3D效果', id: 12, com: Fake3d },
  { name: 'babylon-3D', id: 13, com: BBL3D },
  { name: 'WuJie', id: 14, com: WuJie },
  { name: 'BBL动画测试', id: 15, com: AnimateTest }
]
