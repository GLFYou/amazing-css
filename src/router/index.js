import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/layout.vue')
const Home = () => import('@/views/home/index.vue')
const ComDetail = () => import('@/views/comDetail/index.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/com-detail/:id', component: ComDetail }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
