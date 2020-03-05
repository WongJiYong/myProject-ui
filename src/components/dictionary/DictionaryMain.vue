<template>
    <div id="DictionaryMain">
        <el-row type="flex" justify="center">
            <el-col :span="16">
                <div class="grid-content">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-button type="primary" @click="addDictionary">添加</el-button>
                            <el-button type="primary" :disabled="modifyBtnDisabled" @click="modifyDictionary">修改
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-table
                            ref="elTable"
                            :data="tableData"
                            style="width: 100%"
                            row-key="id"
                            border
                            default-expand-all
                            :highlight-current-row="true"
                            :indent="16"
                            :lazy="false"
                            @current-change="selectionChange"
                            :tree-props="{children: 'children'}">
                        <el-table-column
                                type="index"
                                label=""
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="value"
                                label="值"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="valid"
                                label="有效"
                                width="60"
                                :formatter="trueFormatter">
                        </el-table-column>
                        <el-table-column
                                prop="comment"
                                label="备注">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <el-dialog
                :title="dictionFormDialog.title"
                width="30%"
                :visible.sync="dictionFormDialog.visible">
            <dictionary-form
                    :initFormData="dictionFormDialog.initFormData"
                    :actionUrl="dictionFormDialog.actionUrl"
                    :cancel-submit="cancelSubmit"
                    :submit-callback="submitCallback"></dictionary-form>
        </el-dialog>
    </div>
</template>

<script>
    import DictionaryForm from "./DictionaryForm";

    export default {
        name: "DictionaryMain",
        components: {DictionaryForm},
        data() {
            return {
                dictionFormDialog: {
                    visible: false,
                    title: "",
                    //表单提交地址
                    actionUrl: "",
                    //初始化表单数据
                    initFormData: {},
                },
                tableData: [],
                // 当前选中的行
                currentRow: null
            }
        },
        computed: {
            modifyBtnDisabled() {
                return this.currentRow === null;
            }
        },
        methods: {
            addDictionary() {
                this.dictionFormDialog.title = "添加数据字典";
                this.dictionFormDialog.actionUrl = '/dictionary/add';
                this.dictionFormDialog.initFormData = null;
                this.dictionFormDialog.visible = true
            },
            modifyDictionary() {
                this.dictionFormDialog.title = "编辑数据字典";
                this.dictionFormDialog.actionUrl = '/dictionary/modify';
                this.dictionFormDialog.initFormData = this.currentRow;
                this.dictionFormDialog.visible = true
            },
            selectionChange(selection) {
                this.currentRow = selection;
            },
            loadDictionaries() {
                let message = this.$message;
                let thisData = this.$data;
                let utils = this.$Utils;
                this.$http.get("/dictionary/query").then(function (resp) {
                    thisData.tableData = utils.treeify(resp);
                });//end http
            },
            //对话框点击取消
            cancelSubmit() {
                this.dictionFormDialog.visible = false;
            },
            //对话框点击提交成功后的回调函数
            submitCallback() {
                this.dictionFormDialog.visible = false;
                this.loadDictionaries();
            },
            trueFormatter(row, column, cellValue) {
                return cellValue ? "Yes" : "No";
            }
        },
        mounted() {
            this.loadDictionaries();
        }
    }
</script>