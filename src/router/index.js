import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || null,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home.vue'),
    },
    {
      path: '*',
      name: 'error-404',
      component: () => import('@/pages/errors/E404.vue'),
    },
  ],
})

export default router
