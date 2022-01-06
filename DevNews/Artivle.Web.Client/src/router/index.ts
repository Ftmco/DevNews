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
        path: "/",
        component: () => import("@/layouts/homeLayout.vue"),
        meta: (route: Route) => ({
            route: route,
            title: 'Home'
        }),
        children: [
            {
                path: "",
                name: "Home",
                component: () => import("@/pages/home/index.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: 'Dev News'
                })
            },
            {
                path: "/channels",
                name: "Channels",
                component: () => import("@/pages/channel/channels.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: 'Channels',
                    hasBack:true
                })
            },
            {
                path: "/channel",
                name: "Channel",
                component: () => import("@/pages/channel/ChannelItems.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: `${route.query.name}`,
                    noBottomNavigation: true,
                    hasBack:true,
                    unShow:true
                })
            },
            {
                path: "/account/login",
                name: "Login",
                component: () => import("@/pages/account/Login.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: 'Login',
                    middleware: guest
                })
            },
            {
                path: "/account/profile",
                name: "Profile",
                component: () => import("@/pages/account/Profile.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: 'Profile',
                    middleware: auth
                })
            },
            {
                path: "/account/forgotPassword",
                name: "ForgotPassword",
                component: () => import("@/pages/account/ForgotPassword.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: 'Forgot Password',
                    middleware: guest
                })
            },

            {
                path: "/account/signup",
                name: "SignUp",
                component: () => import("@/pages/account/SignUp.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: 'SignUp',
                    middleware: guest
                })
            },

            {
                path: "/account/activeAccount",
                name: "ActiveAccount",
                component: () => import("@/pages/account/ActiveAccount.vue"),
                meta: (route: Route) => ({
                    route: route,
                    title: 'Active Account',
                    middleware: guest
                })
            }
        ]
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
})

router.beforeEach((to: any, from: Route, next: NavigationGuardNext<Vue>) => {

    let meta = to.meta(to)
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

export default router;