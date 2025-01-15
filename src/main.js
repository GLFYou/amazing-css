import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from '@/router'
import store from '@/store/index.js'
import '@/assets/styles/normalize.css'
import '@/assets/styles/common.scss'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import Wujie from 'wujie-vue3'
import 'virtual:windi.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cube'

createApp(App).use(router).use(store).use(Wujie).mount('#app')
