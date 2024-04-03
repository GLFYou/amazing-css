<template>
  <div class="home-container">
    <ul class="com-box">
      <li class="com-item" v-for="(item, index) in comList" :key="index" @click="goToDetail(item.id)">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ruoyiText } from '@/apis/home.js'
const modules = import.meta.glob('@/components/**/*.vue')

const comList = ref([])

onMounted(async () => {
  Promise.all(Object.values(modules).map((module) => module())).then((components) => {
    comList.value = components.map((item, index) => {
      return { name: item.default.__name, id: index }
    })
  })

  const res = await ruoyiText()
  console.log('ruoyiText', res)
})

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
      font-size: 20px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: rgb(254, 52, 183);
        box-shadow: 0 0 80px 10px rgb(254, 52, 183);
      }
    }
  }
}
</style>
