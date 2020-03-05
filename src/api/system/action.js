import http from '@/global/http'

const actionUrl = {
    add: '/action/add',
    remove: '/action/remove',
    modify: '/action/modify',
    query: '/action/query',
};

const actionServices = {
    query(params) {
        return http.post(actionUrl['query'], params);
    },
    modify(params) {
        return http.post(actionUrl['modify'], params);
    },
    add(params) {
        return http.post(actionUrl['add'], params);
    },
    remove(params) {
        return http.post(actionUrl['remove'], params);
    },
};

export default actionServices