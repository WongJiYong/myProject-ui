<template>
    <el-row>
        <el-col>
            <el-form v-model="userSetting" label-width="150px">
                <el-form-item label="默认角色">
                    <el-select v-model="userSetting.roleId" placeholder="默认角色" value="admin">
                        <el-option
                                v-for="role in roles"
                                :key="role.id"
                                :label="role.name"
                                :value="role.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="默认分页大小">
                    <el-input-number v-model="userSetting.pageSize" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button @click="reset">重置</el-button>
                    <el-button type="primary" @click="submit">保存</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import userAction from "@/api/system/user";

    const DEFAULT_FORM = {
        pageSize: 10,
    };
    export default {
        name: "user-setting",
        data() {
            return {
                userSetting: {},
                roles: []
            }
        },
        methods: {
            reset() {
                this.initForm(DEFAULT_FORM);
            },
            submit() {
                userAction.modifySetting(this.userSetting)
            },
            initForm(form) {
                this.userSetting = Object.assign({}, form);
            }
        },
        mounted() {
            this.roles = this.$store.state.user.roles;
            this.initForm(this.$store.state.user.settings);
        }
    }
</script>