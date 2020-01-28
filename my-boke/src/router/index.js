import Vue from 'vue'
import VueRouter from 'vue-router'
import Look from '../components/index.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'look',
        component: Look
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/leaveMes',
        name: 'leaveMes',
        component: () =>
            import ('../views/leaveMes.vue')
    },
    {
        path: '/record',
        name: 'record',
        component: () =>
            import ('../views/record.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('../views/about.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'link-active',
    linkActiveClass: 'active',
    routes
})

export default router