<template>
    <el-row>
        <el-col>
            <el-form v-model="userInfo" label-width="150px">
                <el-form-item label="name">
                    <el-input v-model="userInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="nickName">
                    <el-input v-model="userInfo.nickName"></el-input>
                </el-form-item>
                <el-form-item label="phone">
                    <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="email">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "user-info",
        data() {
            return {
                userInfo: {},
            }
        },
        methods:{
            initForm(form){
                this.userInfo = Object.assign({},form);
            }
        },
        mounted() {
            this.initForm(this.$store.state.user)
        }
    }
</script>

<style scoped>

</style>