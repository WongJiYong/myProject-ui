<template>
    <div>
        <i class="el-icon-success" style="color: #409EFF" v-if="enabled"></i>
        <i class="el-icon-error" style="color: #F56C6C" v-else></i>
    </div>
</template>

<script>
    export default {
        name: "enabled",
        props: {
            enabled: Boolean
        }
    }
</script>

<style scoped>

</style>