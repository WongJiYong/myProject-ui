import http from '@/global/http'
import qs from "qs";
import menuAction from "@/api/system/menu";

const URL = {
    login: '/login',
    logout: '/logout',
    info: '/user/info',
    modifySetting: '/user/setting',

    lock: '/user/lock',
    queryRole: '/user/roles/query',
    add: '/user/add',
    modify: '/user/modify',
    remove: '/user/remove',
    query: '/user/query',
    addRole: '/user/role/add',
    removeRole: '/user/role/remove',
};
const userAction = {
    login(params) {
        return http({
            method: 'post',
            url: URL['login'],
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(params)
        });
    },
    logout() {
        return http.post(URL.logout);
    },
    lock(params) {
        return http.post(URL.lock, params);
    },
    //授权成功后加载 用户信息,用户配置,菜单,系统配置
    loadInfoAfterAuthenticated() {
        //登录之后重新加载csrfToken
        let p1 = userAction.info();
        let p2 = menuAction.load();
        return Promise.all([p1, p2])
    },

    info() {
        return http.get(URL['info']);
    },
    add(params) {
        return http.post(URL['add'], params);
    },
    modify(params) {
        return http.post(URL['modify'], params);
    },
    remove(params) {
        return http.post(URL['remove'], params);
    },
    query(params) {
        return http.post(URL['query'], params);
    },
    queryRole(params){
        return http.post(URL['queryRole'], params);
    },
    addRole(params) {
        return http.post(URL['addRole'], params);
    },
    removeRole(params) {
        return http.post(URL['removeRole'], params);
    },
    modifySetting(params) {
        return http.post(URL['modifySetting'], params);
    }
};

export default userAction;
