<template>
    <div>
        <el-row :style="headStyle"></el-row>
        <el-row :style="mainStyle">
            <el-col :span="5" :offset="16">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px">
                    <h3 class="title">
                        企业级脚手架
                    </h3>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
                                  @keyup.enter.native="handleLogin">
                        </el-input>
                    </el-form-item>
                    <!--            <el-form-item prop="code">-->
                    <!--                <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%"-->
                    <!--                          @keyup.enter.native="handleLogin">-->
                    <!--                    <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>-->
                    <!--                </el-input>-->
                    <!--                                <div class="login-code">-->
                    <!--                                    <img :src="codeUrl" @click="">-->
                    <!--                                </div>-->
                    <!--            </el-form-item>-->
                    <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
                        记住我
                    </el-checkbox>
                    <el-form-item>
                        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                                   @click="handleLogin">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row :style="footerStyle"
                v-if="this.$store.state.settings.showFooter">
            <app-footer style="position:absolute;bottom: 0;"></app-footer>
        </el-row>
    </div>
</template>

<script>
    import userAction from '@/api/system/user'
    import utils from "@/global/utils";
    import {updateRouter} from "@/global/router"
    import AppFooter from "@/views/layout/app-footer";
    import securityAction from "@/api/security";
    import {Loading} from 'element-ui';

    export default {
        name: 'Login',
        components: {AppFooter},
        data() {
            return {
                codeUrl: '',
                cookiePass: '',
                loginForm: {
                    username: 'admin',
                    password: '123456',
                    rememberMe: true,
                    code: '',
                    uuid: ''
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
                    password: [{required: true, trigger: 'blur', message: '密码不能为空'}],
                },
                loading: false,
                headStyle: {
                    height: ''
                },
                mainStyle: {
                    height: ''
                },
                footerStyle: {
                    height: '',
                }
            }
        },
        methods: {
            handleLogin() {
                this.loading = true;
                this.$refs.loginForm.validate(valid => {
                    const user = {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                        rememberMe: this.loginForm.rememberMe,
                        code: this.loginForm.code
                    };
                    if (valid) {
                        userAction.login(user).then(() => {
                            this.successAuthenticated().then(() => {
                                let redirect = this.$route.query && this.$route.query.redirect;
                                let nextPage = redirect || '/index';
                                //不能后退
                                this.$router.replace(nextPage);
                            });
                        }).catch(() => {
                            this.loading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false
                    }
                })
            },
            getHeight() {
                this.headStyle.height = window.innerHeight / 4 + "px";
                this.mainStyle.height = window.innerHeight / 2 + "px";
                this.footerStyle.height = window.innerHeight / 4 + "px";
            },
            successAuthenticated() {
                return new Promise((resolve, reject) => {
                    userAction.loadInfoAfterAuthenticated().then(values => {
                        // values = [userInfo, menus]
                        let userInfo = values[0];
                        let menus = values[1];
                        this.$store.commit('SET_USER', userInfo);
                        updateRouter(menus);
                        utils.treeify(menus);
                        this.$store.commit('SET_MENUS', menus);
                        //登录成功后 csrfToken失效 重新获取
                        this.$store.commit('CLEAN_CSRF_TOKEN');
                        resolve(values);
                    }).catch(error => {
                        reject(error);
                    });
                });
            }

        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight();
            //auto login
            let autoLogin = this.$route.query && this.$route.query.autoLogin;
            //如果从首页跳转过来尝试自动登录 使用 rememberMe cookie
            if (autoLogin) {
                let loadingInstance = Loading.service({
                    lock: true,
                    text: 'auto login',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                securityAction.hello().then(() => {
                    this.successAuthenticated().then(() => {
                        let redirect = this.$route.query && this.$route.query.redirect;
                        let nextPage = redirect || '/index';
                        //不能后退
                        this.$router.replace(nextPage);
                    });
                }).finally(() => {
                    loadingInstance.close();
                });
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.getHeight)
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .title {
        margin: 0 auto 30px auto;
        text-align: center;
        color: #707070;
    }
</style>
