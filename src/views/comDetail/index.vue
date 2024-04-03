<template>
  <div class="com-list-container">
    <div class="back" @click="$router.back()">返回</div>
    <div class="home" @click="$router.push('/home')">菜单</div>
    <!-- <template v-if="activeCom !== null"> -->
    <component class="com-box" :is="activeCom" @getVal="getVal"> </component>
    <!-- </template> -->
  </div>
</template>
<script setup>
import { reactive, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
const modules = import.meta.glob('@/components/**/*.vue')

const route = useRoute()
const activeCom = shallowRef(null)

onMounted(async () => {
  Promise.all(Object.values(modules).map((module) => module())).then((components) => {
    const comList = components.map((item, index) => {
      return { com: item.default, id: index }
    })
    const activeItem = comList.find((item) => item.id === Number(route.params.id))
    activeCom.value = activeItem.com
  })
})

// const activeCom = computed(() => {
//   const comObj = comList.value.find((item) => item.id === Number(route.params.id))
//   return comObj.com
// })

const getVal = (val) => {
  console.log('value:', val)
}
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

  .back,
  .home {
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
      box-shadow: 0 0 80px 10px rgb(254, 52, 183);
    }
  }
  .home {
    left: unset;
    right: 20px;
  }
  .com-box {
    // width: 100vw;
  }
}
</style>
