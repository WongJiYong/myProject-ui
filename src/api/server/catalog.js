import http from "@/global/http";

const URL = {
    'add': '/catalog/add',
    'remove': '/catalog/remove',
    'modify': '/catalog/modify',
    'query': '/catalog/query'
};

const catalogAction = {
    modify(params,) {
        return http.post(URL['modify'], params);
    },
    add(params) {
        return http.post(URL['add'], params);
    },
    remove(params) {
        return http.post(URL['remove'], params);
    },
    query(params) {
        return http.post(URL['query'], params);
    }
};
export default catalogAction;