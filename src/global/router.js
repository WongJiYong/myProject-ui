import store from '@/global/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/layout/index'

import login from '@/views/login'

Vue.use(VueRouter); //使用VueRouter

export const constantRouterMap = [
    {
        path: '/',
        redirect: (to, Route) => {
            return {
                path: '/login',
                query: {
                    'autoLogin': true
                }
            }
        }
    },
    {
        path: '/login',
        meta: {requiresAuth: false},
        component: login,
        // hidden: true
    },
    {
        path: '/404',
        meta: {requiresAuth: false},
        component: () => import('@/views/404'),
        // hidden: true
    },
    {
        path: '/401',
        meta: {requiresAuth: false},
        component: () => import('@/views/401'),
        // hidden: true
    },
];

const router = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

router.beforeEach((to, from, next) => {
    console.log('router: ' + from.path + '-->' + to.path);
    //如果访问需要登录的页面 且没有授权
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.user.authenticated) {
            //TODO 尝试自动登录(用户可能使用remember me)
        }
        if (!store.state.user.authenticated) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next();
        }
    } else {
        next() // 确保一定要调用 next()
    }
});

export default router

//把json对象转换为router识别组件
const convertJson2RouterComponent = function (viewJsonObjs) {
    let routers = [];
    for (let i = 0; i < viewJsonObjs.length; i++) {
        let viewJsonObj = viewJsonObjs[i];
        if (viewJsonObj.component && viewJsonObj.path) {
            let viewComponent = {
                path: viewJsonObj.path,
                meta: {requiresAuth: true},
                component: loadView(viewJsonObj.component)
            };
            routers.push(viewComponent);
        }
    }
    return routers;
};
const loadView = (view) => {
    return () => import(/* webpackChunkName: "views" */ `@/views/${view}.vue`);
};

export function updateRouter(jsonRouters) {
    //过滤一遍加载过的路由
    let loadedRouters = store.state.user.routers;
    let newRouters = [];
    for (let i = 0; i < jsonRouters.length; i++) {
        let jsonRt = jsonRouters[i];
        if (!loadedRouters[jsonRt.path]) {
            newRouters.push(jsonRt);
            store.commit('ADD_ROUTER', jsonRt.path);
        }
    }
    let routers = convertJson2RouterComponent(newRouters);
    let indexConfig = {
        path: '/index',
        component: index,
        meta: {requiresAuth: true},
        children: []
    };
    //添加通用路由
    if (!loadedRouters['/user/center']) {
        store.commit('ADD_ROUTER', '/user/center');
        indexConfig.children = routers.concat(userRouter);
    } else {
        indexConfig.children = routers;
    }
    router.addRoutes([indexConfig]);
}

const userRouter = [
    {
        path: '/user/center',
        component: loadView('user/user-center'),
        meta: {requiresAuth: true},
        children: [
            {
                path: '/user/setting',
                component: loadView('user/user-setting'),
                meta: {requiresAuth: true},
            },
            {
                path: '/user/info',
                component: loadView('user/user-info'),
                meta: {requiresAuth: true},
            },
        ]
    },
];
