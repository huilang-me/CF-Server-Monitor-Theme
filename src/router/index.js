import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/server/:id',
    name: 'ServerDetail',
    component: () => import('../views/ServerDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
