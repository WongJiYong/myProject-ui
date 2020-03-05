<template>
    <el-container :style="containerStyle">
        <el-header style="background-color: #545c64">
            <el-row>
                <el-col :span="20">
                    <app-head></app-head>
                </el-col>
                <el-col :span="4">
                    <user-head></user-head>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import AppHead from "./app-head";
    import AppFooter from "@/views/layout/app-footer";
    import UserHead from "@/views/layout/user-head";

    export default {
        name: 'index',
        components: {
            UserHead,
            AppFooter,
            AppHead,
        },
        data() {
            return {
                containerStyle: {
                    height: ''
                }
            }
        },
        methods: {
            getHeight() {
                this.containerStyle.height = window.innerHeight + "px";
            }
        },
        created() {
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },
        destroyed() {
            window.removeEventListener('resize', this.getHeight)
        }
    }
</script>
<style scoped>
    .bg-purple {
        background: #d3dce6;
    }
</style>
