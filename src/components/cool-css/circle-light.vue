<!-- 炫酷的按钮 -->
<template>
  <div class="circle-light-container">
    <!-- 按钮1 -->
    <div class="light-box">
      <div class="light"></div>
      <div class="center">确定</div>
    </div>
    <!-- 按钮2 -->
  </div>
</template>
<script setup>
const name = 'circle-light'
</script>

<style lang="scss" scoped>
$color1: rgb(246, 255, 0);
$color2: rgb(231, 15, 94);
@keyframes ani {
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.circle-light-container {
  .light-box {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    // overflow: hidden;
    .light {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background-image: -webkit-linear-gradient(left, $color1, $color2);
      animation: ani 2s infinite linear;
      border-radius: 50%;
      // box-shadow: -5px 0 50px 0 $color1, 5px 0 50px 0 $color2;
    }
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: 90%;
      color: #fff;
      // background-image: -webkit-radial-gradient(rgb(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3));
      background-color: black;
      border-radius: 50%;
      user-select: none;
      letter-spacing: 5px;
      // box-shadow: inset 5px 0 10px 1px rgba(0, 255, 255, 0.516), inset -10px 0 10px 1px rgba(224, 15, 231, 0.543);
      border: 2px solid rgb(228, 61, 89);
      transition: all 0.2s;
      &:hover {
        color: pink;
        transform: translate(-50%, -50%) scale(1.05);
        font-size: 26px;
      }
    }
  }
}
</style>
