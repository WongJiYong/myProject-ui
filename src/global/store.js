import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex);

const getters = {

};
export default new Vuex.Store({
    modules: {
        app: app,
        auth: auth,
        settings: settings,
        user: user
    },
    getters: getters
})