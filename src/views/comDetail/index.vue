<template>
  <div class="com-list-container">
    <div class="back" @click="$router.back()">返回</div>
    <component class="com-box" :is="activeCom" @getVal="getVal"> </component>
  </div>
</template>
<script setup>
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

import { useRoute } from 'vue-router'
import ScrollSnap from '@/components/cool-css/scroll-snap.vue'
// = ref(null)

const getVal = (val) => {
  console.log('value:', val)
}
const comList = [
  { id: 0, com: WaterDrop },
  { id: 1, com: CircleLight },
  { id: 2, com: StrokeBtn },
  { id: 3, com: BottleText },
  { id: 4, com: SlidePicker },
  { id: 5, com: RenderOptimization },
  { id: 6, com: SvgAnimate },
  { id: 7, com: Car },
  { id: 8, com: DinosaurGame },
  { id: 9, com: ScrollSnap },
  { id: 10, com: GsapPixi },
  { id: 11, com: AppleWeb }
]
const route = useRoute()
const activeCom = computed(() => {
  const comObj = comList.find((item) => item.id === Number(route.params.id))
  return comObj.com
})
</script>

<style lang="scss" scoped>
.com-list-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: rgb(26, 59, 74);
  color: #fff;
  .back {
    z-index: 999;
    position: fixed;
    left: 20px;
    top: 20px;
    padding: 5px 10px;
    font-size: 20px;
    color: aqua;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    border: 5px double #fe34b7;
    border-radius: 10px;
    &:hover {
      color: #fe34b7;
    }
  }
  .com-box {
    // width: 100vw;
  }
}
</style>
