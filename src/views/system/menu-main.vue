<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-button type="text"
                       @click="activateDialog('add', {parentIds:selectedMenu.parentIds})">添加
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedMenu)"
                       @click="removeMenu">删除
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedMenu)"
                       @click="activateDialog('modify', selectedMenu)">修改
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedMenu)"
                       @click="activateDialog('', selectedMenu)">查看
            </el-button>
            <el-table
                    ref="menusTable"
                    :data="menus"
                    row-key="id"
                    default-expand-all
                    highlight-current-row
                    @row-click="clickMenu">
                <el-table-column
                        label="#" min-width="10%"
                        type="index"/>
                <el-table-column
                        prop="name" min-width="80%"
                        label="名字"/>
                <el-table-column
                        prop="sort"
                        min-width="30%"
                        label="排序"/>
                <el-table-column
                        prop="icon" min-width="30%"
                        label="图标"/>
                <el-table-column
                        prop="enabled" min-width="30%"
                        label="启用">
                    <template v-slot="{row}">
                        <enabled v-bind:enabled="row.enabled"></enabled>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="path" min-width="80%"
                        label="路径"/>
                <el-table-column
                        prop="component" min-width="100%"
                        label="组件路径"/>
            </el-table>
        </el-col>
        <el-col :span="9">
            <h3>
                <template v-if="this.selectedMenu.name">
                    {{ this.selectedMenu.name + ':' }}
                </template>
                按钮
            </h3>
            <br/>
            <el-button type="text"
                       @click="activateActionDialog('add', {})">添加
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedAction)"
                       @click="removeAction">删除
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedAction)"
                       @click="activateActionDialog('modify', selectedAction)">修改
            </el-button>
            <el-button type="text" :disabled="!Boolean(selectedAction)"
                       @click="activateActionDialog('', selectedAction)">查看
            </el-button>
            <el-table
                    :data="actions"
                    highlight-current-row
                    @row-click="clickAction"
                    row-key="id">
                <el-table-column
                        label="#" min-width="30%"
                        type="index"/>
                <el-table-column
                        prop="name" min-width="80%"
                        label="名字"/>
                <el-table-column
                        prop="path" min-width="100%"
                        label="请求路径"/>
                <el-table-column
                        prop="enabled" min-width="30%"
                        label="启动">
                    <template v-slot="{row}">
                        <enabled :enabled="row.enabled"></enabled>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="locked" min-width="30%"
                        label="锁定">
                    <template v-slot="{row}">
                        <locked :locked="row.locked"></locked>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :visible.sync="menuForm.visible" width="40%">
                <menu-form :action="menuForm.action"
                           :form="menuForm.value"
                           :parents="menus"
                           :afterAction="afterMenuSubmit"></menu-form>
            </el-dialog>
            <el-dialog :visible.sync="actionForm.visible" width="40%">
                <action-form :action="actionForm.action"
                             :form="actionForm.value"
                             :menus-tree="menus"
                             :after-action="afterActionSubmit"></action-form>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
    import MenuForm from "@/components/system/menu/menu-form";
    import menuActions from "@/api/system/menu";
    import utils from "@/global/utils";
    import ActionForm from "@/components/system/menu/action-form";
    import actionServices from "@/api/system/action";
    import Enabled from "@/components/elewarp/enabled";
    import Locked from "@/components/elewarp/locked";
    import {Notification} from 'element-ui';

    export default {
        name: "MenuMain",
        components: {Locked, Enabled, ActionForm, MenuForm},
        data() {
            return {
                menus: [],
                actions: [],
                selectedMenu: '',
                selectedAction: '',
                menuForm: {
                    visible: false,
                    action: '',
                    value: {},
                },
                actionForm: {
                    visible: false,
                    action: '',
                    value: {},
                }
            }
        },
        methods: {
            queryAllMenus(done) {
                menuActions.query().then(resp => {
                    utils.treeify(resp);
                    this.menus = resp;
                    done && done(resp);
                });
            },
            clickMenu(row) {
                this.selectedMenu = row;
                this.actions = row.actions;
            },
            clickAction(row) {
                this.selectedAction = row;
            },
            removeMenu() {
                //数据校验
                if (this.selectedMenu.children && this.selectedMenu.children.length) {
                    Notification.error('请先删除子菜单');
                    return false;
                }
                if (this.selectedMenu.actions && this.selectedMenu.actions.length) {
                    Notification.error('请先删除按钮');
                    return false;
                }
                menuActions.remove(this.selectedMenu).then(() => {
                    this.queryAllMenus();
                });
            },
            removeAction() {
                let index = this.actions.indexOf(this.selectedAction);
                actionServices.remove(this.selectedAction).then(() => {
                    this.actions.splice(index, 1);
                })
            },
            activateDialog(action, value) {
                let form = this.menuForm;
                form.visible = true;
                form.value = value;
                form.action = action;
            },
            activateActionDialog(action, value) {
                let form = this.actionForm;
                let menusIds = [].concat(this.selectedMenu.parentIds);
                menusIds.push(this.selectedMenu.id);
                value.menuIds = menusIds;
                form.visible = true;
                form.value = value;
                form.action = action;
            },
            afterMenuSubmit() {
                this.menuForm.visible = false;
                this.queryAllMenus();
            },
            afterActionSubmit() {
                this.actionForm.visible = false;
                actionServices.query({menuId: this.selectedMenu.id}).then(resp => {
                    this.actions.splice(0, this.actions.length);
                    for (let i = 0; i < resp.length; i++) {
                        this.actions.push(resp[i]);
                    }
                });
            },
        },
        mounted() {
            this.queryAllMenus();
        }
    }
</script>