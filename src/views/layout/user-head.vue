<template>
    <div>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                {{ this.$store.state.user.username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/user/center">个人中心</el-dropdown-item>
                <el-dropdown-item>反馈</el-dropdown-item>
                <el-dropdown-item divided command="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="el-dropdown-link" @command="switchRole">
            <span>
                角色:[{{ roleName }}]
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu>
                <el-dropdown-item :command="role.id" v-for="role in roles"
                                  :disabled="Boolean(roleName === role.name)"
                                  v-bind:key="role.id">
                    {{role.name}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import userAction from "@/api/system/user";

    export default {
        name: "user-head",
        data() {
            return {
                roleName: '',
                roles: [],
            }
        },
        methods: {
            handleCommand(command) {
                if (command === 'logout') {
                    userAction.logout().then(() => {
                        this.$store.commit('CLEAN');
                        this.$router.push('/login').catch(err => {
                        });
                    });
                } else {
                    this.$router.push(command).catch(err => {
                    });
                }
            },
            switchRole(role) {
                console.log(role);
            }
        },
        mounted() {
            this.roles = this.$store.state.user.roles;
            this.roleName = this.$store.state.user.currentRoleName;
        }
    }
</script>

<style scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #d0d0d0;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>