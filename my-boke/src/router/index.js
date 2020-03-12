import Vue from 'vue'
import VueRouter from 'vue-router'
import Look from '../views/Index.vue'

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
            import ('../views/Home.vue'),
    },
    {
        path: '/leaveMes',
        name: 'leaveMes',
        component: () =>
            import ('../views/LeaveMes.vue')
    },
    {
        path: '/record',
        name: 'record',
        component: () =>
            import ('../views/Record.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/article',
        name: 'article',
        component: () =>
            import ('../views/Article.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/Register.vue')
    },
    {
        path: '*',
        redirect(to) {
            return '/home';
        }
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