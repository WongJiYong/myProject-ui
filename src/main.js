require('@babel/register');
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app';

import Cookies from 'js-cookie'
import VueProgressBar from 'vue-progressbar'
import store from './global/store'
import router from './global/router'


// 权限指令
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'small' // set element-ui default size
});

const options = {
    color: '#00FF00',
    failedColor: '#FF0000',
    thickness: '2px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};

Vue.use(VueProgressBar, options);

export default new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});