<template>
  <div class="wujie-container">
    <div class="title">WUJIE</div>
    <div class="btn-box">
      <button @click="destroyWujie">销毁wujie</button>
      <button @click="emitData">发送数据</button>
      <button @click="$router.push('/com-detail/14/user-center')">user-center</button>
      <button @click="$router.push('/com-detail/14/home')">home</button>
      <!-- <button @click="emitData">{{ $route.query }}</button> -->
    </div>
    <div class="wujie-box">
      <WujieVue width="100%" height="500px" name="wujie" :url="vue2Url"></WujieVue>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import WujieVue3 from 'wujie-vue3'
const { bus, setupApp, preloadApp, destroyApp } = WujieVue3
const route = useRoute()

const vue2Url = 'http://localhost:8848/#'
const vue2Url2 = 'http://localhost:8849'
watch(
  () => route.path,
  (newVal) => {
    window.nowUrl = route.path
    console.log('mainAppUrl: ', newVal)
    bus.$emit('urlChange', newVal)
  },
  { immediate: true }
)
// 配置无界
const setupWujie = () => {
  setupApp({
    name: 'wujie',
    url: vue2Url,
    props: { data: 'data1', id: 1 },
    exec: true,

    beforeLoad: () => {
      console.log('before subApp load')
    },
    activated: () => {
      console.log(' subApp activated')
    },
    deactivated: () => {
      console.log('subApp deactivated')
    },
    loadError: () => {
      console.error('load error')
    },
    beforeMount: () => {
      console.log('before mount in mainApp')
    }
  })
  // 预加载
  preloadApp({
    name: 'wujie',
    url: vue2Url,
    exec: true
  })
}

// 数据发送至子应用
const emitData = () => {
  bus.$emit('msg', 'userInfo', { name: 'linda', age: 24 })
}
// 销毁无界
const destroyWujie = () => {
  destroyApp('wujie')
}

onMounted(() => {
  setupWujie()
  console.log(route.params)
})
</script>

<style lang="scss" scoped>
.wujie-container {
  width: 90vw;
  height: 80vh;

  // overflow-x: hidden;
  .title {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    font-size: 30px;
    letter-spacing: 20px;
    color: rgb(254, 52, 183);
    font-weight: bold;
  }
  .wujie-box {
    height: 40vh;
    overflow-y: auto;

    border: 2px solid aqua;
    border-radius: 10px;
  }
  .btn-box {
    z-index: 999;
    position: fixed;
    left: 20px;
    bottom: 20px;
    width: 100%;
    display: flex;
    flex-flow: wrap row;
    justify-content: start;
    button {
      margin-right: 20px;
    }
  }
}
</style>
