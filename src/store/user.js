import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      name: '临空'
    }
  },
  getters: {},
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage, // 修改存储位置。默认是sessionStorage，其在关闭标签会重置
        paths: ['name'] // 需要持久化的数据，默认全部
      }
    ]
  }
})
