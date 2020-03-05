import utils from "@/global/utils";

export default {
    state: {
        authenticated: false,
        createTime: '',
        email: '',
        lastPasswordResetTime: '',
        nickName: '',
        phone: '',
        sex: '',
        username: '',
        currentRoleName: '',
        roles: [],
        menus: [],
        settings: {},
        routers: {}
    },
    mutations: {
        SET_USER: (state, user) => {
            utils.copyProperties(state, user);
            state.authenticated = true;
            state.settings = user.userSetting;
            state.roles = user.roles;
            state.currentRoleName = utils.getNodeInTree(state.roles, 'id', state.settings.roleId)['name'];
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus;
        },
        ADD_ROUTER: (state, path) => {
            state.routers[path] = true;
        },
        SET_PAGE_SIZE: (state, pageSize) => {
            state.settings['pageSize'] = pageSize;
        },
        CLEAN: (state) => {
            state.authenticated = false;
            state.createTime = '';
            state.email = '';
            state.lastPasswordResetTime = '';
            state.nickName = '';
            state.phone = '';
            state.sex = '';
            state.username = '';
            state.currentRoleName = '';
            state.roles = [];
            state.menus = [];
            state.settings = {};
        }
    },
}