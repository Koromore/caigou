import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from '../store/index'
import Login from '@/pages/login/login'
import Register from '@/pages/register/register'
import Personage_datum from '@/pages/personage_datum/personage_datum'
import Personage_update from '@/pages/personage_update/personage_update'
import Corporation_datum from '@/pages/corporation_datum/corporation_datum'
import Corporation_update from '@/pages/corporation_update/corporation_update'

Vue.prototype.$axios = axios;
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     redirect: '/login',
        //     meta: {
        //         requireAuth: true,
        //     }
        // },
        {
            path: '/',
            name: 'login',
            component: Login
        },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: Login
        // },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/personage_datum',
            name: 'personage_datum',
            component: Personage_datum
        },
        {
            path: '/personage_update',
            name: 'personage_update',
            component: Personage_update
        },
        {
            path: '/corporation_datum',
            name: 'corporation_datum',
            component: Corporation_datum
        },
        {
            path: '/corporation_update',
            name: 'corporation_update',
            component: Corporation_update
        }
    ]
})

// 页面刷新时，重新赋值 更新vuex内部值
try {
    if (window.localStorage.getItem('username')) {

        let userInfo = {
            username: localStorage.getItem('username'),
            number: localStorage.getItem('jobnumber'),
            password: localStorage.getItem('password'),
            remember: localStorage.getItem('remember')
        }
        store.commit('login', userInfo)
    }
} catch (e) {

}

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.isLogin == 'success') {
            console.log('%c login success!', 'color:red;background:yellow')
            next();
        }
        else {
            console.log('%c please login!', 'color:blue;background:yellow')
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    }
    else {
        next();
    }
})

export default router;
