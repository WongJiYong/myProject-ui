<template>
    <el-submenu :index="menu.id + '1'" :popper-append-to-body="false">
        <template slot="title">{{menu.name}}</template>
        <template v-if="menu.children && menu.children.length >0" v-for="child in menu.children">
            <cus-sub-menu-item v-if="child.children && child.children.length"
                               v-bind:menu="child"></cus-sub-menu-item>
            <el-menu-item v-else :index="child.path">{{child.name}}</el-menu-item>
        </template>
    </el-submenu>
</template>

<script>
    export default {
        name: "CusSubMenuItem",
        props: {
            menu: Object
        }
    }
</script>

<style scoped>

</style>