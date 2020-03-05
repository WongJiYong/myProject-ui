<template>
    <div id="CatalogMain">
        <el-row type="flex" justify="center">
            <el-col :span="10">
                <el-button type="text" size="small" @click="appendCatalogNode(catalogs)">添加根目录
                </el-button>
                <br/>
                <span class="tip">提示:可拖拽调整顺序或位置(目前不起作用)</span>
                <hr/>
                <el-tree
                        :data="catalogs.children"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                        draggable>
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                          <span>{{ data.label }}</span>
                          <span>{{ data.seq }}
                            <el-button type="text" size="small"
                                       @click="() => alterCatalogNode(node, data)">修改</el-button>
                            <el-button type="text" size="small"
                                       @click="() => appendCatalogNode(data)">添加子目录</el-button>
                            <el-button type="text" size="small"
                                       @click="() => removeCatalogNode(node, data)">删除</el-button>
                          </span>
                        </span>
                </el-tree>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="catalogFormDialog" width="30%">
            <catalog-form
                    v-bind:catalog-template="catalogDialogTemplate"
                    :cancel-submit="cancelSubmit">
            </catalog-form>
        </el-dialog>
    </div>
</template>

<script>
    import CatalogForm from "./CatalogForm";
    import catalog from "../../api/server/catalog"
    import Utils from "~/static/utils";
    import Vue from 'vue'

    export default {
        name: "CatalogMain",
        components: {CatalogForm},
        data() {
            return {
                catalogFormDialog: false,
                catalogDialogTemplate: {},
                catalogs: {},
            }
        },
        methods: {
            alterCatalogNode(node, nodeData) {
                let form = Object.assign({}, catalog.form);
                form.type = 'server';
                Utils.copyProperties(form, nodeData);
                debugger
                let vData = this.$data;
                this.catalogDialogTemplate = {
                    action: 'modify',
                    form: form,
                    submitCallback: function (resp, postForm) {
                        nodeData.label = postForm.label;
                        nodeData.seq = postForm.seq;
                        node.parent.childNodes.sort((x, y) => x.data.seq < y.data.seq ? -1 : x.data.seq > y.data.seq ? 1 : 0);
                        vData.catalogFormDialog = false;
                        return false;
                    }
                };
                this.catalogFormDialog = true;
            },
            appendCatalogNode(nodeData) {
                let form = Object.assign({}, catalog.form);
                Utils.initForm(form);
                form.type = 'server';
                form.seq = nodeData.seq + 1;
                form.parent = nodeData.id;
                let vData = this.$data;
                this.catalogDialogTemplate = {
                    action: 'add',
                    form: form,
                    submitCallback: function (resp, postForm) {
                        const newChild = {
                            id: resp.id,
                            label: postForm.label,
                            seq: postForm.seq,
                            children: []
                        };
                        if (!nodeData.children) {
                            Vue.$set(nodeData, 'children', []);
                        }
                        nodeData.children.push(newChild);
                        //重新排序
                        nodeData.children.sort((x, y) => x.seq < y.seq ? -1 : x.seq > y.seq ? 1 : 0);
                        vData.catalogFormDialog = false;
                    }
                };
                this.catalogFormDialog = true;
            },
            removeCatalogNode(node, nodeData) {
                if (!node.isLeaf) {
                    this.$message.error('请先删除子目录！！！');
                    return;
                }
                let params = Object.assign({}, catalog.form);
                params.id = nodeData.id;
                catalog.remove(params, function (resp) {
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === nodeData.id);
                    children.splice(index, 1);
                });
            },
            cancelSubmit(resp) {
                this.catalogFormDialog = false;
            }
        },
        mounted() {
            let vData = this.$data;
            catalog.query({type:'server'}, function (respData) {
                //建立一个虚拟根结点 统一操作
                const root = {id: 0, label: '', seq: 0, children: []};
                root.children = [].concat(respData);
                vData.catalogs = root;
            });
        }
    }
</script>
<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

    .tip {
        color: #909399;
        font-size: x-small;
    }
</style>