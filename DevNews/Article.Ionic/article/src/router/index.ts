import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: () => import("@/views/Home/TabsPage.vue"),
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home/HomePage.vue')
      },
      {
        path: 'channels',
        component: () => import('@/views/Home/ChannelsPage.vue')
      },
      {
        path: 'search',
        component: () => import('@/views/Home/SearchPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Home/SettingsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
