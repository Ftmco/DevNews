import { changeTitle } from '@/services/title';
import store from '@/store';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import auth from './middleware/auth';
import guest from './middleware/guest';
import pipeline from './pipeline';

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
        redirect: '/tabs/home',
      },
      {
        path: 'home',
        component: () => import('@/views/Home/HomePage.vue'),
        meta: {
          title: 'Article News'
        }
      },
      {
        path: 'channels',
        component: () => import('@/views/Home/ChannelsPage.vue'),
        meta: {
          title: 'Channels'
        }
      },
      {
        path: 'search',
        component: () => import('@/views/Home/SearchPage.vue'),
        meta: {
          title: 'Search'
        }
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('@/views/Home/SettingsPage.vue'),
        meta: {
          middleware: auth,
          title: 'Settings'
        }
      },
    ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Account/AppLogin.vue"),
    meta: {
      title: 'Login',
      middleware: guest
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/Account/SignUp.vue"),
    meta: {
      title: 'Register',
      middleware: guest
    }
  },
  {
    path: '/activation',
    name: 'activation',
    component: () => import("@/views/Account/ActivationAccount.vue"),
    meta: {
      title: 'Activation',
      middleware: guest
    }
  },
  {
    name: 'channel',
    path: '/channel',
    component: () => import("@/views/Channel/AppChannel.vue"),
    meta: {
      title: 'Channel'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to: any, from, next) => {

  const meta = to.meta
  changeTitle(meta.title)
  if (!meta.middleware) {
    return next()
  }

  const middleware = meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }

  return middleware({
    ...context,
    next: pipeline(context, middleware, 1)
  })

})


export default router
