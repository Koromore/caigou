import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import qs from 'qs'
import store from '../store/index'

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login',
            meta: {
               requireAuth: true,
           }
        },
        {
            path: '*',
            redirect: '/login',
            meta: {
               requireAuth: true,
           }
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/pages/login/login'],resolve),
        },
        {
            path: '/pages/home',
            name:"home",
            redirect: '/personage_update',
            component: resolve => require(['@/pages/home/home'],resolve),
            meta:{
                requireAuth: true,
            },
            children:[
                {
                    path: '/personage_datum',
                    name: 'personage_datum',
                    component: resolve => require(['@/pages/home/personage_datum/personage_datum'],resolve),
                    meta: {
                        title: '个人信息详情',
                        requireAuth: true,
                    }
                },
                {
                    path: '/personage_update',
                    name: 'personage_update',
                    component: resolve => require(['@/pages/home/personage_update/personage_update'],resolve),
                    meta: {
                        title: '个人更新页面',
                        requireAuth: true,
                    }
                },
                {
                    path: '/corporation_datum',
                    name: 'corporation_datum',
                    component: resolve => require(['@/pages/home/corporation_datum/corporation_datum'],resolve),
                    meta: {
                        title: '公司信息详情',
                        requireAuth: true,
                    }
                },
                {
                    path: '/corporation_update',
                    name: 'corporation_update',
                    component: resolve => require(['@/pages/home/corporation_update/corporation_update'],resolve),
                    meta: {
                        title: '公司信息更新',
                        requireAuth: true,
                    }
                },
            ]
        }
    ]
})


// 页面刷新时，重新赋值 更新vuex内部值
try {
    if (window.localStorage.getItem('phone')) {

        let userInfo = {
            phone:localStorage.getItem('phone'),
        }
        store.commit('login',userInfo)
    }
} catch (e) {

}

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.isLogin=='success') {
            console.log('%c login success!','color:red;background:yellow')
            next();
        }
        else {
            console.log('%c please login!','color:blue;background:yellow')
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;
