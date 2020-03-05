import http from '@/global/http'
import store from "@/global/store";

const URL = {
    CSRF_URL: '/csrf',
    hello: '/hello'
};

const securityAction = {
    csrfToken() {
        let promise;
        if (store.state.auth.csrfTokenCached) {
            promise = Promise.resolve(store.state.auth.csrfToken);
        } else {
            promise = http.get(URL.CSRF_URL);
            promise.then(resp => {
                store.commit('SET_CSRF_TOKEN', resp);
            });
        }
        return promise;
    },
    hello() {
        return http.get(URL.hello);
    }
};
export default securityAction;