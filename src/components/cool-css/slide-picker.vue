<template>
  <div class="slide-picker-container">
    <div class="slide-picker">
      <div class="picker">
        <ul class="slider1">
          <li class="slider-item" :class="{ active: itemIndex === index }" v-for="(item, index) in itemList" :key="index">{{ item }}</li>
        </ul>
        <ul class="slider2">
          <li class="slider-item" :class="{ active: itemIndex === index }" v-for="(item, index) in itemList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const emit = defineEmits(['getVal'])
const props = defineProps({
  list: {
    type: Array,
    default: () => [1, 2, 3, 4, 5, 6, 7, 8]
  }
})

// 处理空数组、数组长度小于6的情况
const itemList = computed(() => {
  let tempArr = []
  if (props.list.length === 0) {
    tempArr = ['empty!', 'empty!', 'empty!', 'empty!', 'empty!', 'empty!']
  }
  if ((props.list.length < 6)) {
    for (let i = 0; i < 6; i++) {
      tempArr = [...tempArr, ...props.list]
    }
  } else {
    tempArr = props.list
  }
  return tempArr
})

let preDragEndY = 0
let nowSlider = 'slider1'
let preDragY = 0
const itemIndex = ref(0)

onMounted(() => {
  // getMouseDir()
  const h = gsap.getProperty('.slider2', 'height')
  gsap.set('.slider1', { top: 80 })
  gsap.set('.slider2', { top: -h + 80 })

  const dragger = Draggable.create('.picker', {
    type: 'y',
    dragResistance: 0.6,
    // bounds: document.querySelector('.slide-picker'),
    // bounds: { top: -80, left: 0, width: 200, height: 800 },
    // liveSnap: (value) => {
    //   return Math.round(value / 40) * 40
    // },
    onDragEnd: (val) => {
      const y = gsap.getProperty('.picker', 'y') // 滚动条y位移
      const step = Math.abs(y - preDragEndY) // 单次拖动距离
      const isDown = dragger[0].getDirection() === 'down' // 滚动条是否向下

      // 松开后跳转到某个段，而不是任意位置
      const snapFn = (val) => {
        gsap.to('.picker', {
          y: val,
          duration: 0.1,
          onComplete: () => {
            preDragEndY = gsap.getProperty('.picker', 'y') // 存储当前位置
            dragger[0].enable()

            // 获取选取的值
            const itemCount = h / 40
            let index = 0
            if (preDragEndY < 0) {
              index = ((-preDragEndY % h) / h) * itemCount
            } else {
              index = itemCount - ((preDragEndY % h) / h) * itemCount
            }
            if (index === itemCount) index = 0
            itemIndex.value = index
            console.log('itemIndex:', itemIndex.value)
            emit('getVal', itemList.value[itemIndex.value])
            // console.log(itemIndex.value)
          }
        })
      }
      // 单次拖动距离求余格子高度后小于10，四舍五入，保持
      if (step % 40 < 10) {
        dragger[0].disable()
        snapFn(Math.round(y / 40) * 40)
        // 单次拖动距离求余格子高度后大于于10，进位
      } else if (step % 40 > 10) {
        dragger[0].disable()
        if (isDown) {
          snapFn(Math.ceil(y / 40) * 40)
        } else {
          snapFn(Math.floor(y / 40) * 40)
        }
      } else {
        preDragEndY = gsap.getProperty('.picker', 'y') // 存储当前位置
      }
    },
    onDrag: () => {
      const dragY = gsap.getProperty('.picker', 'y')
      const isDown = dragY - preDragY > 0 // 这里使用拖动元素的位移判断，更精确

      // 获取当前指向哪个slider
      if ((Math.floor(Math.abs(dragY) / h) % 2 && dragY < 0) || (!(Math.floor(Math.abs(dragY) / h) % 2) && dragY > 0)) {
        nowSlider = 'slider2'
      } else {
        nowSlider = 'slider1'
      }

      const moveStep = Math.floor(dragY / h) // 累计移动步数

      // slider瞬间位移
      const sliderMove = (ele, y) => {
        gsap.set(ele, { y })
      }
      const half = h / 2 - 20

      // 指针到了slider中间位置，slider瞬间位移
      if (Math.abs((Math.abs(dragY) % h) - half) < 40) {
        if (!isDown) {
          nowSlider === 'slider1' ? sliderMove('.slider2', (-moveStep + 1) * h) : sliderMove('.slider1', -moveStep * h)
        } else {
          nowSlider === 'slider1' ? sliderMove('.slider2', -(moveStep + 1) * h) : sliderMove('.slider1', -(moveStep + 2) * h)
        }
      }
      preDragY = dragY
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-picker-container {
  background-color: rgb(50, 56, 66);
  border-radius: 10px;
  // border: 1px solid rgb(222, 30, 30);
  box-shadow: inset 0 0 20px 0 rgba(0, 0, 0), inset 0 0 100px 0 rgba(0, 0, 0);
  overflow: hidden;
  .slide-picker {
    position: relative;
    display: flex;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 5px solid rgb(255, 83, 83);
    -webkit-mask-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000, rgba(0, 0, 0, 0));
    color: #888;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 20px;
      height: 20px;
      background-color: rgb(255, 0, 0);
      transform: translateY(-50%);
      clip-path: polygon(0 0, 0 20px, 20px 10px);
    }
    &::before {
      left: 10%;
    }
    &::after {
      right: 10%;
      transform: translateY(-50%) rotateY(180deg);
    }
    .picker {
      width: 100%;
      position: relative;
      // height: max-content;
      .slider1,
      .slider2 {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;

        .slider-item {
          position: relative;
          margin: 0 auto;
          width: 100px;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          user-select: none;
          background-color: rgb(40, 44, 68);
          box-shadow: inset 0 0 10px 0 rgb(0, 0, 0);
          transition: all 0.1s;
          &::before {
            content: '';
            border-top: 1px solid #666;
            width: 50%;
            height: 0;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          &.active {
            color: red;
            text-shadow: 0 0 10px red;
          }
        }
      }
      // .slider1 {
      // }
      // .slider2 {
      //   // color: rgb(118, 232, 12);
      // }
    }
  }
}
</style>
