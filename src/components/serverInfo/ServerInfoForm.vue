<template>
    <div id="ServerInfoForm">
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <div class="grid-content">
                    <el-form :model="serverForm.form" label-width="80px">
                        <el-form-item label="IP">
                            <el-input v-model="serverForm.ip"></el-input>
                        </el-form-item>
                        <el-form-item label="服务器名">
                            <el-input v-model="serverForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="目录">
                            <el-cascader
                                    :options="serverCatalogs"
                                    expand-trigger="hover"
                                    v-model="serverForm.catalogIds"
                                    :filterable="true"
                                    :props="{ expandTrigger: 'hover', checkStrictly: true ,label:'name',value:'id'}">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input v-model="serverForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="text" v-model="serverForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="详情">
                            <el-input type="textarea" v-model="serverForm.detail"></el-input>
                        </el-form-item>
                        <el-form-item v-if="action">
                            <el-button type="primary" @click="onAction"
                                       :loading="submitLoading">提交
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import catalogAction from "@/api/server/catalog";
    import utils from "@/global/utils";
    import serverAction from "@/api/server/server";


    const DEFAULT_FORM = {
        id: null,
        ip: '134.96.',
        name: '',
        catalogIds: [],
        catalogId: null,
        username: '',
        password: '',
        detail: ''
    };
    export default {
        name: "ServerInfoForm",
        data() {
            return {
                serverCatalogs: [],
                serverForm: {},
                submitLoading: false
            }
        },
        methods: {
            onAction() {
                this.submitLoading = true;
                this.serverForm.catalogId = this.catalogId;
                serverAction[this.action](this.serverForm).then(resp => {
                    this.submitLoading = false;
                    this.afterAction && this.afterAction(resp);
                });
            },
            initData(form) {
                let tForm = Object.assign({}, DEFAULT_FORM);
                utils.copyProperties(tForm, form);
                if (tForm.catalogId || tForm.catalogId === 0) {
                    let catalogIds = utils.getNodeInTree(this.serverCatalogs, 'id', tForm.catalogId)['parentIds'];
                    tForm.catalogIds = [].concat(catalogIds, tForm.catalogId);
                }
                this.serverForm = tForm;
            }
        },
        computed: {
            catalogId() {
                let ids = this.serverForm.catalogIds;
                if (ids && ids.length > 1) {
                    return ids[ids.length - 1];
                }
                return null;
            }
        },
        mounted() {
            //先加载目录 然后初始化表单
            catalogAction.query({type: 'server'}).then(resp => {
                utils.treeify(resp);
                this.serverCatalogs = resp;
                this.initData(this.form);
            });
        },
        watch: {
            form: function (newValue, oldValue) {
                this.initData(newValue);
            }
        },
        props: {
            form: {
                id: Number,
                ip: String,
                name: String,
                catalogId: Number,
                username: String,
                password: String,
                detail: String
            },
            action: String,
            afterAction: Function,
        },
    }
</script>