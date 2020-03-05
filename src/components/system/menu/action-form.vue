<template>
    <el-form ref="actionForm" :model="actionForm"
             size="medium"
             label-width="100px">
        <el-form-item label="name">
            <el-input v-model="actionForm.name"></el-input>
        </el-form-item>
        <el-form-item label="menu">
            <el-cascader :options="standerMenusTree" v-model="actionForm.menuIds"
                         :show-all-levels="false"
                         clearable
                         :props="{ expandTrigger: 'hover'}"></el-cascader>
        </el-form-item>
        <el-form-item label="path">
            <el-input v-model="actionForm.path"></el-input>
        </el-form-item>

        <el-form-item label="locked">
            <el-switch v-model="actionForm.locked">
            </el-switch>
        </el-form-item>
        <el-form-item label="enabled">
            <el-switch v-model="actionForm.enabled">
            </el-switch>
        </el-form-item>

        <el-form-item>
            <el-button v-if="Boolean(this.action)" type="primary" @click="onAction"
                       :loading="submitLoading">提交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import actionServices from "@/api/system/action";
    import utils from "@/global/utils";

    const defaultForm = {
        id: null,
        name: '',
        menuId: 0,
        menuIds: [],
        icon: '',
        path: '',
        locked: false,
        enabled: true,
        version: null,
    };
    export default {
        name: "ActionForm",
        data() {
            return {
                actionForm: {},
                submitLoading: false
            }
        },
        methods: {
            onAction() {
                this.submitLoading = true;
                this.actionForm.menuId = this.menuId;
                actionServices[this.action](this.actionForm).finally(() => {
                    this.submitLoading = false;
                    this.afterAction && this.afterAction();
                })
            },
            initForm(form) {
                let tForm = Object.assign({}, defaultForm);
                utils.copyProperties(tForm, form);
                this.actionForm = tForm;
            },
        },
        computed: {
            menuId: function () {
                let ids = this.actionForm.menuIds;
                return ids ? ids[ids.length - 1] : 0;
            },
            standerMenusTree: function () {
                return utils.convertStanderTree(this.menusTree);
            }
        },
        mounted() {
            this.initForm(this.form);
        },
        watch: {
            form: function (newForm, oldForm) {
                this.initForm(newForm);
            }
        },
        props: {
            form: {
                id: Number,
                name: String,
                menuId: Number,
                menuIds: Array,
                icon: String,
                path: String,
                locked: Boolean,
                enabled: Boolean,
                version: Number
            },
            menusTree: Array,
            action: String,
            afterAction: Function,
        }
    }
</script>