<template>
    <el-row>
        <el-col :span="10">
            <el-button type="text"
                       @click="activateDialog('add', {})">添加
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedRole)"
                       @click="removeRole">删除
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedRole)"
                       @click="activateDialog('modify', selectedRole)">修改
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedRole)"
                       @click="activateDialog('', selectedRole)">查看
            </el-button>
            <el-table :data="rolesData"
                      row-key="id"
                      highlight-current-row
                      @row-click="clickRole">
                <el-table-column
                        type="index"
                        label="#"></el-table-column>
                <el-table-column
                        label="name"
                        prop="name"></el-table-column>
            </el-table>
        </el-col>
        <el-col :span="6">
            <h3>菜单:</h3>
            <el-tree :data="menuTree"
                     ref="menuTree"
                     node-key="id"
                     :props="{label:'name'}"
                     show-checkbox
                     default-expand-all
                     :expand-on-click-node="false"
                     highlight-current
                     check-strictly
                     @check="checkMenu"
                     @node-click="clickMenu">
            </el-tree>
        </el-col>
        <el-col :span="6">
            <h3>按钮:</h3>
            <el-tree ref="actionTree"
                     :data="actionTree"
                     node-key="id"
                     :props="{label:'name'}"
                     @check="checkAction"
                     check-strictly
                     show-checkbox>
            </el-tree>
        </el-col>
        <el-dialog :visible.sync="roleForm.visible"
                   width="30%">
            <role-form
                    :form="roleForm.value"
                    :action="roleForm.action"
                    :after-action="afterSubmit"></role-form>
        </el-dialog>
    </el-row>
</template>

<script>
    import RoleForm from "~/components/system/role-form";
    import roleAction from "~/api/system/role";
    import menu from "~/api/system/menu";
    import utils from "~/global/utils";
    import {Notification} from 'element-ui';

    export default {
        name: "roleMain",
        components: {RoleForm},
        data() {
            return {
                menuTree: [],
                rolesData: [],
                actionTree: [],
                selectedRole: '',
                roleForm: {
                    visible: false,
                    value: {},
                    action: '',
                }
            }
        },
        methods: {
            initData() {
                roleAction.query().then(resp => {
                    this.rolesData = resp;
                })
            },
            clickRole(row) {
                this.selectedRole = row;
                this.actionTree = [];
                this.$refs.menuTree.setCheckedKeys(row.menuIds);
            },
            clickMenu(data, node, self) {
                this.actionTree = data.actions;
                this.$refs.actionTree.setCheckedKeys(this.selectedRole['actionIds']);
            },
            checkMenu(data, node) {
                let checkedKeys = node.checkedKeys;
                let menuIds = this.selectedRole.menuIds;
                let param = {
                    roleId: this.selectedRole.id,
                    menuId: data.id
                };
                if (checkedKeys.indexOf(data.id) < 0) {
                    roleAction.removeMenu(param).then(() => {
                        menuIds.splice(menuIds.indexOf(data.id), 1);
                    }).catch(() => {
                        this.$refs.menuTree.setChecked(data, true);
                    });
                } else {
                    roleAction.addMenu(param).then(() => {
                        menuIds.push(data.id);
                    }).catch(() => {
                        this.$refs.menuTree.setChecked(data, false);
                    });
                }
            },
            checkAction(data, node) {
                let checkedKeys = node.checkedKeys;
                let actionIds = this.selectedRole['actionIds'];
                let param = {
                    roleId: this.selectedRole.id,
                    actionId: data.id
                };
                if (checkedKeys.indexOf(data.id) < 0) {
                    roleAction.removeAction(param).then(() => {
                        actionIds.splice(actionIds.indexOf(data.id), 1);
                    }).catch(() => {
                        this.$refs.actionTree.setChecked(data, true);
                    });
                } else {
                    roleAction.addAction(param).then(() => {
                        actionIds.push(data.id);
                    }).catch(() => {
                        this.$refs.actionTree.setChecked(data, false);
                    });
                }
            },
            afterSubmit() {
                this.roleForm.visible = false;
                this.initData();
            },
            activateDialog(action, value) {
                let form = this.roleForm;
                form.visible = true;
                form.value = value;
                form.action = action;
            },
            removeRole() {
                //检查数据 menuIds actionIds
                if (this.selectedRole.menuIds && this.selectedRole.menuIds.length) {
                    Notification.error(`该角色[${this.selectedRole.name}]拥有菜单`);
                    return false;
                }
                if (this.selectedRole['actionIds'] && this.selectedRole['actionIds'].length) {
                    Notification.error(`该角色[${this.selectedRole.name}]拥有请求`);
                    return false;
                }
                roleAction.remove(this.selectedRole).then(() => {
                    this.initData();
                });
            }
        },
        mounted() {
            this.initData();
            menu.query().then(resp => {
                utils.treeify(resp);
                this.menuTree = resp;
            })
        }
    }
</script>

<style scoped>

</style>