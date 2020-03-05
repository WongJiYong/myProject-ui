<template>
    <el-form v-model="userForm"
             label-width="100px">
        <el-form-item label="name">
            <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="email">
            <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="locked">
            <el-switch v-model="userForm.enabled"></el-switch>
        </el-form-item>
        <el-form-item v-if="Boolean(action)">
            <el-button type="primary" @click="onAction"
                       :loading="submitLoading">提交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import userAction from "@/api/system/user";
    import utils from "@/global/utils";

    const DEFAULT_FORM = {
        id: null,
        username: '',
        email: '',
        enabled: false,
        locked: Boolean,
    };
    export default {
        name: "user-form",
        data() {
            return {
                userForm: {},
                submitLoading: false,
            }
        },
        methods: {
            onAction() {
                this.submitLoading = true;
                userAction[this.action](this.userForm).finally(() => {
                    this.submitLoading = false;
                    this.afterAction && this.afterAction();
                });
            },
            initForm(form) {
                let tForm = Object.assign({}, DEFAULT_FORM);
                utils.copyProperties(tForm, form);
                this.userForm = tForm;
            },
        },
        mounted() {
            this.initForm(this.form);
        },
        watch: {
            form(newValue) {
                this.initForm(newValue);
            }
        },
        props: {
            form: {
                id: Number,
                username: String,
                email: String,
                enabled: Boolean,
                locked: Boolean,
            },
            action: String,
            afterAction: Function,
        },
    }
</script>

<style scoped>

</style>