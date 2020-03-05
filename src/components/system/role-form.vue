<template>
    <el-form v-model="roleForm"
             label-width="100px">
        <el-form-item label="name"
                      prop="name">
            <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="enabled"
                      prop="enable">
            <el-switch v-model="roleForm.enabled"></el-switch>
        </el-form-item>
        <el-form-item v-if="Boolean(this.action)">
            <el-button type="primary" @click="onAction"
                       :loading="submitLoading">提交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import roleAction from "@/api/system/role";
    import utils from "@/global/utils";

    const DEFAULT_FORM = {
        id: null,
        name: '',
        enabled: true,
    };
    export default {
        name: "roleForm",
        data() {
            return {
                roleForm: {},
                submitLoading: false,
            }
        },
        methods: {
            onAction() {
                this.submitLoading = true;
                roleAction[this.action](this.roleForm).then(resp => {
                    this.afterAction && this.afterAction(resp);
                }).finally(() => {
                    this.submitLoading = false;
                });
            },
            initForm(form){
                let tForm = Object.assign({}, DEFAULT_FORM);
                utils.copyProperties(tForm, form);
                this.roleForm = tForm;
            }
        },
        mounted(){
            this.initForm(this.form);
        },
        watch:{
            form(newValue, oldValue){
                this.initForm(newValue);
            }
        },
        props: {
            form: {
                id: Number,
                name: String,
                enabled: Boolean,
            },
            action: String,
            afterAction: Function,
        },
    }
</script>

<style scoped>

</style>