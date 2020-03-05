<template>
    <div>
        <i class="el-icon-lock" style="color: #F56C6C" v-if="locked"></i>
        <i class="el-icon-unlock" style="color: #409EFF" v-else></i>
    </div>
</template>

<script>
    export default {
        name: "locked",
        props: {
            locked: Boolean
        }
    }
</script>

<style scoped>

</style>