<template>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageForm.currentPage"
            :page-sizes="[60, 160, 260, 360]"
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="pageForm.pageSize"
            :total="pageForm.total">
    </el-pagination>
</template>

<script>
    export default {
        name: "cust-pagination",
        data() {
            return {
                pageForm: {
                    total: 0,
                    currentPage: 1,
                    pageSize: null,
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$store.commit('SET_PAGE_SIZE', val);
                this.pageForm.pageSize = val;
                this.onChange();
            },
            handleCurrentChange(val) {
                this.pageForm.currentPage = val;
                this.onChange();
            },
            getPageForm() {
                return this.pageForm;
            },
            setPageForm(pageForm) {
                this.pageForm.total = pageForm.total;
                this.pageForm.currentPage = pageForm['pageNum'];
            }
        },
        mounted() {
            this.pageForm.pageSize = this.$store.state.user.settings.pageSize || 10
        },
        props: {
            onChange: Function
        }
    }
</script>

<style scoped>

</style>