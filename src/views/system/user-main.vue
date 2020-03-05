<template>
    <el-row>
        <el-form inline :model="queryUserForm"
                 label-position="right"
                 label-width="50px">
            <el-form-item label="姓名:">
                <el-input v-model="queryUserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮件:">
                <el-input v-model="queryUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户状态:" label-width="75px">
                <el-checkbox v-model="queryUserForm.locked" true-label="true" false-label="">锁定</el-checkbox>
                <el-checkbox v-model="queryUserForm.enable" true-label="false" false-label="">无效</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryUsers">查询</el-button>
            </el-form-item>
        </el-form>
        <el-col :span="19">
            <el-button type="text"
                       @click="activateDialog('add', {})">添加用户
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedUser)"
                       @click="lockedUser">锁定用户
            </el-button>
            <!--            <el-button type="text" :disabled="!Boolean(selectedUser)"-->
            <!--                       @click="activateDialog('modify', selectedUser)">修改-->
            <!--            </el-button>-->
            <el-button type="text" :disabled="!Boolean(selectedUser)"
                       @click="activateDialog('', selectedUser)">查看
            </el-button>
            <el-table :data="users"
                      highlight-current-row
                      @row-click="clickUser">
                <el-table-column label="#"
                                 type="index"
                                 min-width="20%"></el-table-column>
                <el-table-column label="姓名"
                                 prop="username"
                                 min-width="80%"></el-table-column>
                <el-table-column label="昵称"
                                 prop="nickName"
                                 min-width="80%"></el-table-column>
                <el-table-column label="邮件"
                                 prop="email"
                                 min-width="80%"></el-table-column>
                <el-table-column label="电话"
                                 prop="phone"
                                 min-width="50%"></el-table-column>
                <el-table-column label="有效"
                                 prop="enabled"
                                 min-width="20%">
                    <template v-slot="{row}">
                        <enabled :enabled="row.enabled"></enabled>
                    </template>
                </el-table-column>
                <el-table-column label="锁定"
                                 prop="locked"
                                 min-width="20%">
                    <template v-slot="{row}">
                        <locked :locked="row.locked"></locked>
                    </template>
                </el-table-column>
            </el-table>
            <cust-pagination :on-change="queryUsers" ref="userPage"></cust-pagination>
        </el-col>
        <el-col :span="5">
            <h3>用户角色:</h3>
            <el-tree ref="roleTree"
                     :data="roleTree"
                     highlight-current
                     show-checkbox
                     node-key="id"
                     check-strictly
                     @check="checkRole"
                     :props="{label:'name'}">
            </el-tree>
        </el-col>
        <el-dialog :visible.sync="userForm.visible" width="30%">
            <user-form :action="userForm.action"
                       :after-action="afterSubmit"
                       :form="userForm.value">
            </user-form>
        </el-dialog>
    </el-row>
</template>

<script>
    import roleAction from "@/api/system/role";
    import userAction from "@/api/system/user";
    import UserForm from "@/components/system/user-form";
    import Enabled from "@/components/elewarp/enabled";
    import Locked from "@/components/elewarp/locked";
    import CustPagination from "@/components/elewarp/cust-pagination";
    import {Notification} from "element-ui"

    export default {
        name: "user-main",
        components: {CustPagination, Locked, Enabled, UserForm},
        data() {
            return {
                roleTree: [],
                users: [],
                selectedUser: '',
                queryUserForm: {},
                userForm: {
                    action: '',
                    value: {},
                    visible: false
                }
            }
        },
        methods: {
            activateDialog(action, value) {
                this.userForm.action = action;
                this.userForm.value = value;
                this.userForm.visible = true;
            },
            clickUser(row) {
                this.selectedUser = row;
                userAction.queryRole(row).then(resp => {
                    this.$refs.roleTree.setCheckedKeys(resp);
                });
            },
            lockedUser() {
                userAction.lock(this.selectedUser).then(() => {
                    this.queryUsers();
                })
            },
            afterSubmit() {
                this.userForm.visible = false;
                this.queryUsers();
            },
            checkRole(data, node) {
                let checkedKeys = node.checkedKeys;
                if (!this.selectedUser) {
                    Notification.info("请先选择用户");
                    return false;
                }
                let param = {
                    userId: this.selectedUser.id,
                    roleId: data.id
                };
                if (checkedKeys.indexOf(data.id) < 0) {
                    userAction.removeRole(param).catch(() => {
                        this.$refs.roleTree.setChecked(data, true);
                    });
                } else {
                    userAction.addRole(param).catch(() => {
                        this.$refs.roleTree.setChecked(data, false);
                    });
                }
            },
            queryUsers() {
                let form = this.queryUserForm;
                form.page = this.$refs.userPage.getPageForm();
                userAction.query(form).then(resp => {
                    this.users = resp.data;
                    this.$refs.userPage.setPageForm(resp);
                    this.$refs.roleTree.setCheckedKeys([]);
                    this.selectedUser = '';
                });
            },
        },
        mounted() {
            this.queryUsers();
            roleAction.query().then(resp => {
                this.roleTree = resp;
            });
        }
    }
</script>

<style scoped>

</style>