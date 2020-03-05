<template>
    <el-form ref="menuForm" :model="menuForm"
             size="medium"
             label-width="100px">
        <el-row>
            <el-col :span="13">
                <el-form-item label="name">
                    <el-input v-model="menuForm.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9">
                <el-form-item label="sort" label-width="40%">
                    <el-input-number :min="1"
                                     :max="10000"
                                     controls-position="right"
                                     size="small"
                                     v-model="menuForm.sort"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="parentMenu">
                    <el-cascader v-model="menuForm.parentIds"
                                 clearable
                                 :options="parentTree"
                                 :props="{ expandTrigger: 'hover',checkStrictly: true}">
                    </el-cascader>
                </el-form-item>
            </el-col>
            <el-col :span="9">
                <el-form-item label="enabled" label-width="40%">
                    <el-switch v-model="menuForm.enabled">
                    </el-switch>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="path">
            <el-input v-model="menuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="component">
            <el-input v-model="menuForm.component"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button v-if="Boolean(this.action)" type="primary" @click="onAction"
                       :loading="submitLoading">提交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import menu from "@/api/system/menu";
    import utils from "@/global/utils";

    const DEFAULT_FORM = {
        id: null,
        name: '',
        path: '',
        component: '',
        icon: '',
        parentIds: [],
        sort: 1,
        enabled: true,
        version: null
    };
    export default {
        name: "MenuForm",
        data() {
            return {
                menuForm: {},
                submitLoading: false,
            }
        },
        computed: {
            menuForm_pid: function () {
                let pIds = this.menuForm.parentIds;
                return pIds && pIds.length > 0 ? pIds[pIds.length - 1] : 0;
            },
            parentTree: function () {
                return utils.convertStanderTree(this.parents, node => {
                    return Boolean(node.path);
                });
            }
        },
        methods: {
            onAction() {
                this.submitLoading = true;
                this.menuForm['pid'] = this.menuForm_pid;
                menu[this.action](this.menuForm).finally(() => {
                    this.submitLoading = false;
                    this.afterAction && this.afterAction();
                });
            },
            initForm(form) {
                let tForm = Object.assign({}, DEFAULT_FORM);
                utils.copyProperties(tForm, form);
                this.menuForm = tForm;
            },
        },
        mounted() {
            this.initForm(this.form);
        },
        watch: {
            form: function (newForm) {
                this.initForm(newForm);
            }
        },
        props: {
            form: {
                id: Number,
                name: String,
                path: String,
                icon: String,
                component: String,
                parentIds: Array,
                sort: Number,
                enabled: Boolean,
                version: Number
            },
            parents: Array,
            action: String,
            afterAction: Function,
        },
    }
</script>

<style scoped>

</style>