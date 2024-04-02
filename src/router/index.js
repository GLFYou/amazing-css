import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/layout.vue')
const Home = () => import('@/views/home/index.vue')
const ComDetail = () => import('@/views/comDetail/index.vue')
const T1 = () => import('@/components/cool-css/slide-picker.vue')
const T2 = () => import('@/components/pixi/gsap-pixi.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      {
        path: '/com-detail/:id',
        component: ComDetail,
        children: [
          { path: 'user-center', component: T1 },
          { path: 'home', component: T2 }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router, routes }
