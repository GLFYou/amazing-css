<template>
  <div class="bottle-text-container">
    <div class="bottle-sides">
      <div class="bottle-side" v-for="(item, index) in 9" :key="index" :style="{ '--rx': `${40 * index}deg` }">
        <span v-for="(item2, index2) in textArr" :key="index2">{{ item2 }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const text = ref('drink more water!')
const textArr = ref([])
onMounted(() => {
  textArr.value = text.value.split('')
})
</script>

<style lang="scss" scoped>
@keyframes spinAni {
  100% {
    transform: translate(-50%, -50%) rotateZ(90deg) rotateX(360deg);
  }
}
.bottle-text-container {
  position: relative;
  width: 200px;
  height: 300px;
  perspective: 1200px;
  .bottle-sides {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotateZ(90deg);
    animation: spinAni 5s linear infinite;
    width: 16em;
    height: 1em;
    transform-style: preserve-3d;

    .bottle-side {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotateX(var(--rx));
      transform-style: preserve-3d;
      width: 100%;
      height: 100%;
      line-height: 1em;

      span {
        font-size: 30px;
        text-transform: uppercase;
        font-family: monospace;
        display: inline-block;
        width: 1ch;
        backface-visibility: hidden;
        &:nth-child(1) {
          transform: translateZ(1.8ch) rotateY(0) scaleY(1);
        }
        &:nth-child(2) {
          transform: translateZ(2ch) rotateY(-15deg) scaleY(1);
        }
        &:nth-child(3) {
          transform: translateZ(2.25ch) rotateY(-30deg) scaleY(1);
        }
        &:nth-child(4) {
          transform: translateZ(2.75ch) rotateY(-30deg) scaleY(1.4);
        }
        &:nth-child(5) {
          transform: translateZ(3.25ch) rotateY(-30deg) scaleY(1.6);
        }
        &:nth-child(6) {
          transform: translateZ(3.5ch) rotateY(0deg) scaleY(1.75);
        }
        &:nth-child(7) {
          transform: translateZ(3.5ch) rotateY(0deg) scaleY(1.75);
        }
        &:nth-child(8) {
          transform: translateZ(3.5ch) rotateY(0deg) scaleY(1.75);
        }
        &:nth-child(9) {
          transform: translateZ(3.3ch) rotateY(15deg) scaleY(1.7);
        }
        &:nth-child(10) {
          transform: translateZ(3ch) rotateY(15deg) scaleY(1.5);
        }
        &:nth-child(11) {
          transform: translateZ(3ch) rotateY(15deg) scaleY(1.5);
        }
        &:nth-child(12) {
          transform: translateZ(2.8ch) rotateY(0deg) scaleY(1.5);
        }
        &:nth-child(13) {
          transform: translateZ(2.9ch) rotateY(0deg) scaleY(1.4);
        }
        &:nth-child(14) {
          transform: translateZ(3ch) rotateY(-15deg) scaleY(1.4);
        }
        &:nth-child(15) {
          transform: translateZ(3.2ch) rotateY(-5deg) scaleY(1.45);
        }
        &:nth-child(16) {
          transform: translateZ(3.2ch) rotateY(10deg) scaleY(1.7);
        }
        &:nth-child(17) {
          transform: translateZ(2.9ch) rotateY(15deg) scaleY(1.5);
        }
      }
    }
  }
}
</style>
