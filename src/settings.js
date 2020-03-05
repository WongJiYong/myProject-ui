let BASE_URL = '';
if (process.env.NODE_ENV === 'dev') {
    BASE_URL = 'https://localhost:8080/api';
} else if (process.env.NODE_ENV === 'prod') {
    BASE_URL = '';
} else if (process.env.NODE_ENV === 'test') {
    BASE_URL = '';
}

module.exports = {
    BASE_URL: BASE_URL,
    /**
     * @description 网站标题
     */
    title: '运维小助手',
    /**
     * @description 是否显示 tagsView
     */
    tagsView: true,
    /**
     * @description 固定头部
     */
    fixedHeader: true,
    /**
     * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
     */
    tokenCookieExpires: 1,
    /**
     * @description 记住密码状态下的密码在Cookie中存储的天数，默认7天
     */
    passCookieExpires: 7,
    /**
     * @description 是否只保持一个子菜单的展开
     */
    uniqueOpened: true,
    /**
     * @description token key
     */
    TokenKey: 'EL-ADMIN-TOEKN',
    /**
     * @description 请求超时时间，毫秒（默认2分钟）
     */
    timeout: 1200000,
    /**
     * @description 是否显示logo
     */
    sidebarLogo: true,
    /**
     * 是否显示设置的底部信息
     */
    showFooter: true,
    /**
     * 底部文字，支持html语法
     */
    footerTxt: '© 2019 ztesoft',
    /**
     * 备案号
     */
    caseNumber: '浙ICP备********号'
}
