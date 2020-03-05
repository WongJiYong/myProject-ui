<template>
    <el-row type="flex" class="" justify="center">
        <el-col :span="3">
            <div class="grid-content">
                <span>目录</span>
                <el-tree
                        :data="catalogTree"
                        node-key="id"
                        ref="serverCatalog"
                        show-checkbox
                        defaultExpandAll
                        check-strictly
                        check-on-click-node
                        @check="checkCatalog">
                </el-tree>
            </div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content">
                <br>
                <el-form inline :model="queryForm" class="demo-form-inline">
                    <el-form-item label="IP">
                        <el-input v-model="queryForm.ip" placeholder="Ip地址"></el-input>
                    </el-form-item>
                    <el-form-item label="服务名">
                        <el-input v-model="queryForm.name" placeholder="服务名"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="queryForm.detail" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item label="查询使用目录">
                        <el-switch
                                v-model="queryForm.useCatalog"
                                active-value="true"
                                inactive-value="false">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="onLoading" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
                <div>
                    <el-button type="text" :disabled="!Boolean(currentServerRow)"
                               @click="activateServerDialog('', currentServerRow)"
                               icon="el-icon-view">查看
                    </el-button>
                    <el-button type="text"
                               @click="activateServerDialog('add', {catalogId: currentServerRow.catalogId})"
                               icon="el-icon-plus">添加
                    </el-button>
                    <el-button type="text" :disabled="!Boolean(currentServerRow)"
                               @click="activateServerDialog('modify',currentServerRow)"
                               icon="el-icon-edit">修改
                    </el-button>
                    <el-button type="text" :disabled="!Boolean(currentServerRow)" @click="removeServer"
                               icon="el-icon-delete">删除
                    </el-button>
                </div>
                <el-table
                        ref="serverInfoTable"
                        :data="serverData"
                        style="width: 100%;margin-bottom: 20px;"
                        row-key="id"
                        border
                        highlight-current-row
                        @row-click="clickServerRow">
                    <el-table-column
                            prop="ip"
                            label="ip"
                            width="130px"
                            min-width="20%">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            min-width="20%">
                    </el-table-column>
                    <el-table-column
                            label="磁盘使用"
                            min-width="30%">
                        <template v-slot="{ row }">
                            <el-progress
                                    :percentage="diskPercentage(row)"
                                    :show-text="true"
                                    :color="customColorMethod(row)">
                            </el-progress>
                            {{ diskPercentageDesc(row) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            min-width="30%"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            min-width="10%"
                            width="100px">
                        <template v-slot="{ row }">
                            <el-button icon="el-icon-document-copy" circle
                                       @click.native.prevent="copyPassword(row)"
                                       size="small">
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="queryForm.pageData.currentPage"
                            :page-sizes="[10, 20, 40, 100]"
                            :page-size="queryForm.pageData.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryForm.pageData.total">
                    </el-pagination>
                </div>
                <br>
                <!--                    <div v-if="!modifyBtnDisabled">-->
                <!--                        <el-link type="danger" :disabled="modifyBtnDisabled" @click="modifyServerInfo"-->
                <!--                                 icon="el-icon-edit">修改-->
                <!--                        </el-link>-->
                <!--                    </div>-->
                <!--                    <el-table :data="processData"-->
                <!--                              style="width: 100%;margin-bottom: 20px;"-->
                <!--                              row-key="id"-->
                <!--                              border-->
                <!--                              :highlight-current-row="true">-->
                <!--                        <el-table-column-->
                <!--                                prop="pid"-->
                <!--                                label="进程pid">-->
                <!--                        </el-table-column>-->
                <!--                        <el-table-column-->
                <!--                                prop="name"-->
                <!--                                label="进程名">-->
                <!--                        </el-table-column>-->
                <!--                        <el-table-column-->
                <!--                                prop="port"-->
                <!--                                label="端口">-->
                <!--                        </el-table-column>-->
                <!--                        <el-table-column-->
                <!--                                prop="rootPath"-->
                <!--                                label="根路径">-->
                <!--                        </el-table-column>-->
                <!--                        <el-table-column-->
                <!--                                prop="startupSh"-->
                <!--                                label="启动脚本">-->
                <!--                        </el-table-column>-->
                <!--                        <el-table-column-->
                <!--                                prop="shutdownSh"-->
                <!--                                label="停止脚本">-->
                <!--                        </el-table-column>-->
                <!--                        <el-table-column-->
                <!--                                prop="comment"-->
                <!--                                label="附加信息">-->
                <!--                        </el-table-column>-->
                <!--                        <el-table-column-->
                <!--                                prop="status"-->
                <!--                                label="状态">-->
                <!--                        </el-table-column>-->
                <!--                    </el-table>-->
            </div>
        </el-col>
        <el-dialog
                width="40%"
                :visible.sync="serverForm.visible">
            <server-info-form
                    :action="serverForm.action"
                    :form="serverForm.value"
                    :after-action="afterServerAction">
            </server-info-form>
        </el-dialog>
    </el-row>

    <!--        <el-dialog-->
    <!--                :title="processFormDialog.title"-->
    <!--                width="40%"-->
    <!--                :visible.sync="processFormDialog.visible"-->
    <!--                :close-on-click-modal="false">-->
    <!--            <process-form-->
    <!--                    :initFormData="processFormDialog.initFormData"-->
    <!--                    :actionUrl="processFormDialog.actionUrl"-->
    <!--                    :cancel-submit="console.log(1)"-->
    <!--                    :submit-callback="console.log(1)"></process-form>-->
    <!--        </el-dialog>-->
</template>
<script>

    import ServerInfoForm from "@/components/serverInfo/serverinfoform";
    import ProcessForm from "@/components/process/processForm";

    import catalogAction from "@/api/server/catalog";
    import serverAction from "@/api/server/server";
    import utils from "@/global/utils";

    export default {
        name: "AppQueryMain",
        components: {ProcessForm, ServerInfoForm},
        data() {
            return {
                //查询表单
                onLoading: false,
                queryForm: {
                    ip: "",
                    name: "",
                    detail: "",
                    useCatalog: "true",
                    catalogIds: [],
                    pageData: {
                        currentPage: 1,
                        pageSize: 10,
                        total: 0
                    }
                },
                //服务器信息列表
                serverData: [],
                processData: [],
                //目录
                catalogTree: [],
                //服务器信息表单组件参数模板
                serverInfoFormTemplate: {},
                serverForm: {
                    visible: false,
                    value: {},
                    action: '',
                    afterAction: ''
                },
                processForm: {
                    visible: false,
                    value: {},
                    action: '',
                    afterAction: ''
                },
                //当前表格选中的行
                currentServerRow: '',
            }
        },
        methods: {
            checkCatalog(data, obj) {
                this.queryForm.catalogIds = obj.checkedKeys;
                this.queryForm.pageData.currentPage = 1;
                this.queryData();
            },
            handleSizeChange(val) {
                this.queryForm.pageData.pageSize = val;
                this.queryData();
            },
            handleCurrentChange(val) {
                this.queryForm.pageData.currentPage = val;
                this.queryData();
            },
            clickServerRow(row) {
                this.currentServerRow = row;
            },
            copyPassword(tableRow) {
                // let password = tableRow.password;
                // let message = this.$message;
                // if (password == null) {
                //     message.warning('密码为空');
                // }
                // this.$copyText(password).then(function (e) {
                //     message.success('密码复制成功');
                // }, function (e) {
                //     message.error('密码复制失败:' + e);
                // });
            },

            activateServerDialog(action, value) {
                let tForm = this.serverForm;
                tForm.action = action;
                tForm.value = value;
                tForm.visible = true;
            },
            afterServerAction(resp) {
                this.serverForm.visible = false;
                this.queryData();
            },
            removeServer() {
                serverAction.remove(this.currentServerRow);
            },

            onSubmit() {
                this.queryForm.pageData.currentPage = 1;
                this.queryData();
            },
            queryData() {
                this.onLoading = true;
                serverAction.query(this.queryForm).then(resp => {
                    this.serverData = resp.data;
                    this.queryForm.pageData.total = resp['total'];
                    this.queryForm.pageData.currentPage = resp['pageNum'];
                }).finally(() => {
                    this.onLoading = false;
                });
            },
            diskPercentage(row) {
                if (!row.connectable) {
                    return 0;
                } else {
                    return Math.round((row.diskUsed / row.diskTotal) * 100);
                }
            },
            diskPercentageDesc(row) {
                if (!row.connectable) {
                    return '-/-';
                } else {
                    let size = row.diskUsed / 1024;
                    if (size > 1024) {
                        return row.mountedOn + '->' + Math.round(row.diskUsed / 1024 / 1024) + 'G/' +
                            Math.round(row.diskTotal / 1024 / 1024) + 'G';
                    } else {
                        return row.mountedOn + '->' + Math.round(row.diskUsed / 1024) + 'M/' +
                            Math.round(row.diskTotal / 1024) + 'M';
                    }

                }
            },
            customColorMethod(row) {
                let percentage = this.diskPercentage(row);
                if (percentage === 0) {
                    return '#909399'
                } else if (percentage <= 50) {
                    return '#67C23A';
                } else if (percentage <= 80) {
                    return '#E6A23C'
                } else {
                    return '#F56C6C';
                }
            }
        },
        mounted() {
            catalogAction.query({type: 'server'}).then(resp => {
                utils.treeify(resp);
                this.catalogTree = utils.convertStanderTree(resp);
            });
            this.queryData();
        }
    }


</script>