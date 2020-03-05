import http from '@/global/http'

const URL = {
    query: '/role/query',
    add: '/role/add',
    modify: '/role/modify',
    remove: '/role/remove',
    addAction: '/role/action/add',
    removeAction: '/role/action/remove',
    addMenu: '/role/menu/add',
    removeMenu: '/role/menu/remove'
};

const roleAction = {

    query(params) {
        return http.get(URL['query'], params);
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
    addAction(params) {
        return http.post(URL['addAction'], params);
    },
    removeAction(params) {
        return http.post(URL['removeAction'], params);
    },
    addMenu(params) {
        return http.post(URL['addMenu'], params);
    },
    removeMenu(params) {
        return http.post(URL['removeMenu'], params);
    },

};

export default roleAction
