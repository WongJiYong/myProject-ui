export default {
    state: {
        csrfTokenCached: false,
        //防止csrf攻击
        csrfToken: {
            token: '',
            parameterName: '',
            headerName: ''
        },
    },
    mutations: {
        SET_CSRF_TOKEN: (state, csrfToken) => {
            state.csrfTokenCached = true;
            state.csrfToken = csrfToken
        },
        CLEAN_CSRF_TOKEN: (state) => {
            state.csrfTokenCached = false;
            state.csrfToken = {}
        },
        CLEAN: (state) => {
            state.csrfTokenCached = false;
            state.csrfToken = {}
        }
    }
}