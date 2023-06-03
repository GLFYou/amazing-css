<template>
  <div class="scroll-snap-container">
    <div class="items" v-for="(item, index) in BGC" :key="index" :style="`background-color:${item}`">
      <div class="imgBox">
        <img src="@/assets/images/textures/car.jpg" alt="" />
      </div>
      <div class="text">{{ index + 1 }}</div>
    </div>
  </div>
</template>
<script setup>
const BGC = ref(['#ff6767', '#ffae67', '#fffa67', '#c2ff67', '#67ff79', '#67fff5', '#6780ff', '#b867ff', '#ffa3d2', '#b64a82'])
</script>

<style lang="scss" scoped>
.scroll-snap-container {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory; // 滚动吸附类型
  .items {
    position: relative;
    width: 100vw;
    height: 100vh;
    scroll-snap-align: start; // 滚动吸附位置
    overflow: hidden;
    .text {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 80px;
      color: rgb(255, 255, 255);
      z-index: 11;
    }
    .imgBox {
      margin: 0 auto;
      width: 40%;
      img {
        width: 100%;
        object-fit: contain;
        -webkit-box-reflect: below -5px linear-gradient(transparent, rgba(0, 0, 0, 1)); // 反射效果
      }
    }
  }
}
</style>
