import axios from 'axios'
import Config from '@/settings'
import security from '@/api/security'
import appVue from '@/main'
import {Notification} from 'element-ui';
import store from "@/global/store";

// 创建axios实例
const http = axios.create({
    baseURL: Config.BASE_URL, //base_url
    timeout: Config.timeout, // 请求超时时间
    withCredentials: true //请求带上cookie
});
const HTTP_STATUS = {
    OK: 200,
    FORBIDDEN: 403
};
const requiresCsrfMatcher = {
    "get": true, "head": true, "trace": true, "options": true
};
// request拦截器
http.interceptors.request.use(
    config => {
        return new Promise(function (resolve, reject) {
            if (!requiresCsrfMatcher[config.method]) {
                security.csrfToken().then(csrfToken => {
                    config.headers[csrfToken.headerName] = csrfToken.token;
                    appVue.$Progress.start();
                    resolve(config);
                }).catch(error => {
                    appVue.$Progress.fail();
                    reject(error);
                });
            } else {
                appVue.$Progress.start();
                resolve(config);
            }
        });
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Notification.error(error);
        return Promise.reject(error);
    }
);
// response 拦截器
http.interceptors.response.use(
    resp => {
        if (resp.data.success) {
            appVue.$Progress.finish();
            return resp.data.data;
        }
        return Promise.reject(resp.data);
    },
    error => {
        appVue.$Progress.fail();
        //有可能csrfToken失效导致的请求拒绝->清空csrfToken 下次请求重新获取
        let resp = error.response;
        if (resp.status === HTTP_STATUS.FORBIDDEN) {
            store.commit('CLEAN_CSRF_TOKEN');
        }
        //判断异常 是否服务端返回的
        if (typeof resp.data === 'object') {
            Notification.error({
                title: resp.data.code,
                message: resp.data.data
            });
        } else {
            Notification.error({
                title: `${resp.status}:${resp.statusText}`,
                message: resp.data
            });
        }
        return Promise.reject(error);
    }
);

export default http
