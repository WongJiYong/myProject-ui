<template>
    <el-footer style="text-align: center;width: 100%">
        <span v-html="this.$store.state.settings.footerTxt"></span>
        <span>⋅</span>
        <span>{{ $store.state.settings.caseNumber }}</span>
    </el-footer>
</template>

<script>
    export default {
        name: "app-footer"
    }
</script>

<style scoped>

</style>