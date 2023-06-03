<template>
  <div class="home-container">
    <ul class="com-box">
      <li class="com-item" v-for="(item, index) in componentsList" :key="index" @click="goToDetail(item.id)">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const componentsList = ref([
  { id: 0, name: '水滴' },
  { id: 1, name: '圆形旋转边框' },
  { id: 2, name: '炫酷边框按钮' },
  { id: 3, name: '水瓶文字' },
  { id: 4, name: '滑动选择器' },
  { id: 5, name: '大数据渲染优化' },
  { id: 6, name: 'svg动画' },
  { id: 7, name: 'Pixi水滴特效-法拉利' },
  { id: 8, name: '恐龙小游戏' },
  { id: 9, name: '顶部吸附滚动' },
  { id: 10, name: 'GSAP-PixiJs' },
  { id: 11, name: 'AppleWeb' }
])

const router = useRouter()
const goToDetail = (id) => {
  router.push(`/com-detail/${id}`)
}
</script>

<style scoped lang="scss">
.home-container {
  box-sizing: border-box;
  padding: 20px;
  width: 100vw;
  min-height: 100vh;
  background-image: -webkit-linear-gradient(-45deg, #35495e, #41b883, #48c9ff, #bd34fe);
  overflow: hidden;
  .com-box {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-flow: row wrap;
    .com-item {
      margin: 15px;
      padding: 5px 10px;
      border-radius: 10px;
      border: 2px solid rgb(254, 52, 183);
      font-size: 22px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: rgb(254, 52, 183);
      }
    }
  }
}
</style>
