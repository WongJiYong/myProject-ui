<template>
    <el-menu mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <template v-for="menu in menus">
            <cus-sub-menu-item v-if="menu.children&&menu.children.length"
                               v-bind:menu="menu"></cus-sub-menu-item>
            <el-menu-item v-else :index="menu.path">{{menu.name}}</el-menu-item>
        </template>
    </el-menu>
</template>

<script>

    import CusSubMenuItem from "@/components/system/menu/cus-sub-menu-Item";

    export default {
        name: "appHead",
        components: {CusSubMenuItem},
        data() {
            return {
                menus: this.$store.state.user.menus,
            };
        },
        methods: {
            handleSelect(index, indexPath) {
                this.$router.push(index).catch(err => {
                });
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
</style>