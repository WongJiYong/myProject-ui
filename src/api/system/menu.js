import http from '@/global/http'

const URL = {
    load: '/menu/load',
    query: '/menu/query',
    modify: '/menu/modify',
    add: '/menu/add',
    remove: '/menu/remove',
};

const menu = {
    load(params) {
        return http.get(URL['load'], params);
    },
    query(params) {
        return http.get(URL['query'], params);
    },
    modify(params) {
        return http.post(URL['modify'], params);
    },
    add(params) {
        return http.post(URL['add'], params);
    },
    remove(params) {
        return http.post(URL['remove'], params);
    },
};

export default menu
