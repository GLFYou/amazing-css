<template>
  <div class="water-drop-container">
    <div class="water-drop"></div>
  </div>
</template>
<script setup>
const name = 'water-drop'
</script>

<style lang="scss" scoped>
@keyframes waterMove {
  25% {
    border-radius: 32% 68% 63% 37% / 63% 39% 61% 37%;
  }
  50% {
    border-radius: 47% 53% 29% 71% / 54% 56% 44% 46%;
  }
  75% {
    border-radius: 37% 63% 60% 40% / 48% 38% 62% 52%;
  }
  100% {
    border-radius: 50% 50% 63% 37% / 38% 56% 44% 62%;
  }
}
@keyframes lightMove {
  25% {
    transform: translate(5px, 2px) scale(1.2);
  }
  50% {
    transform: translate(2px, 4px) scale(1.1);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.water-drop-container {
  position: relative;
  margin: 20px;
  .water-drop {
    width: 180px;
    height: 150px;
    // border: 1px solid aqua;
    border-radius: 50% 50% 63% 37% / 38% 56% 44% 62%;
    box-shadow: 10px 15px 10px 1px rgba(0, 0, 0, 0.15), 2px 2px 5px 1px rgba(0, 0, 0, 0.15), inset 7px 10px 20px 1px rgba(0, 0, 0, 0.4), inset 3px 3px 8px 1px rgba(0, 0, 0, 0.3), inset -5px -5px 40px 0px rgba(255, 255, 255, 0.2), inset -5px -5px 10px 0px rgba(255, 255, 255, 0.3);
    animation: waterMove 5s infinite linear;
    &::before {
      content: '';
      position: absolute;
      left: 50px;
      top: 30px;
      width: 15px;
      height: 15px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 37% 63% 63% 37% / 45% 48% 52% 55%;
      animation: lightMove 5s infinite linear;
    }
    &::after {
      content: '';
      position: absolute;
      left: 35px;
      top: 45px;
      width: 8px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.8);

      border-radius: 37% 63% 63% 37% / 45% 48% 52% 55%;
      animation: lightMove 5s infinite linear;
    }
  }
}
</style>
