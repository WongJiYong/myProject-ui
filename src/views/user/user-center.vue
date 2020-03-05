<template>
    <el-row>
        <el-col :offset="3" :span="3">
            <el-menu @select="handleSelect"
                     default-active="info"
                     text-color="#0366d6"
                     active-text-color="#24292e">
                <el-menu-item index="info">
                    个人资料
                </el-menu-item>
                <el-menu-item index="setting">
                    系统设置
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="15">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "user-center",
        data() {
            return {
                userInfo: {}
            }
        },
        methods: {
            submit() {

            },
            handleSelect(index) {
                this.$router.push('/user/' + index).catch(err => {
                });
            }
        },
        mounted() {
            this.handleSelect('info');
        }
    }
</script>

<style scoped>

</style>