import http from '@/global/http'

const URL = {
    add: '/server/add',
    remove: '/server/remove',
    modify: '/server/modify',
    query: '/server/query',
};

const serverAction = {
    query(params) {
        return http.post(URL['query'], params);
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
};

export default serverAction
