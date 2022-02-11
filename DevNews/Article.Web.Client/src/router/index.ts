import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';
import { RouteConfig } from 'vue-router'
import guest from './middleware/guest';
import store from "@/store/index"
import pipeline from './pipeline';
import auth from './middleware/auth';
import { changeTitle } from '@/services/title';

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path: '/',
        redirect: '/tabs/home'
    }, {
        path: '/tabs/',
        component: () => import("@/pages/home/TabsPage.vue"),
        children: [
            {
                path: 'home',
                component: () => import("@/pages/home/HomePage.vue")
            },
            {
                path:'channels',
                component:()=>import("@/pages/home/ChannelsPage.vue")
            },
            {
                path: 'search',
                component: () => import("@/pages/home/SearchPage.vue")
            },
            {
                path:'settings',
                component:()=>import("@/pages/home/SettingsPage.vue")
            },
        ]
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
})

// router.beforeEach((to: any, from: Route, next: NavigationGuardNext<Vue>) => {

//     let meta = to.meta(to)
//     changeTitle(meta.title)
//     if (!meta.middleware) {
//         return next()
//     }

//     const middleware = meta.middleware
//     const context = {
//         to,
//         from,
//         next,
//         store
//     }

//     return middleware({
//         ...context,
//         next: pipeline(context, middleware, 1)
//     })

// })

export default router;