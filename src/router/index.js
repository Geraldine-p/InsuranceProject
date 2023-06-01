import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/Login"
    },
    {
        path: "/Login",
        component: () => import('../views/Login.vue')
    }, {
        path: "/register",
        component: () => import('../views/Register.vue')
    }, {
        path: "/Main",
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/',
                redirect: '/Type'
            },
            {
                path: "/Type",
                component: () => import('../views/Type.vue')
            }, {
                path: "/Policy",
                component: () => import('../views/Policy.vue')
            }, {
                path: "/Search",
                component: () => import('../views/Search.vue')
            }, {
                path: "/PolicyDetail",
                component: () => import('../views/PolicyDetail.vue')
            }, {
                path: "/Pay",
                component: () => import('../views/Pay.vue')
            }]
    }
]

const router = new VueRouter({
    routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    // 判断是否登录
    
    if (to.path === "/Login" || to.path === "/register") {
        return next()
    }
    const token = window.sessionStorage.getItem("authorization")
    if (!token) {
        return next("/Login")
    }
    next()
})
export default router
