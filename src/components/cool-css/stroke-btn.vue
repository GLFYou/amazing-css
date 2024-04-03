<template>
  <div class="stroke-btn-container">
    <div class="btn-box">
      <svg width="100" height="50">
        <rect class="rect-shape"></rect>
      </svg>
      <div class="text">首页</div>
    </div>
  </div>
</template>
<script setup>
const name = 'stroke-btn'
</script>

<style lang="scss" scoped>
.stroke-btn-container {
  margin-left: 50px;
  .btn-box {
    position: relative;
    width: 100px;
    height: 50;
    &:hover .rect-shape {
      stroke-width: 4px;
      stroke-dasharray: 10 0;
      stroke-dashoffset: 0;
    }
    .rect-shape {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: aqua;
      stroke-width: 8px;
      stroke-dasharray: 50 175;
      stroke-dashoffset: -175;
      transition: all 1.5s;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: aqua;
    }
  }
}
</style>
