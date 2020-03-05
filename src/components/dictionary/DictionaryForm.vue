<template>
    <div id="dictionaryForm">
        <el-row>
            <el-col>
                <div class="grid-content bg-purple-dark">
                    <el-form :model="dictionaryForm" label-width="80px">
                        <el-form-item label="键">
                            <el-input v-model="dictionaryForm.name" type="text"/>
                        </el-form-item>
                        <el-form-item label="值">
                            <el-input v-model="dictionaryForm.value" type="text"/>
                        </el-form-item>
                        <el-form-item label="目录">
                            <el-cascader
                                    v-model="dictionaryForm.parentIds"
                                    :options="catalogs"
                                    :props="{ expandTrigger: 'hover', checkStrictly: true , label:'name', value:'id', children:'children'}"
                                    clearable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="是否有效">
                            <el-switch v-model="dictionaryForm.valid"/>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="dictionaryForm.comment"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button @click="cancelSubmit">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "DictionaryForm",
        props: {
            initFormData: {
                type: Object,
                required: false
            },
            actionUrl: {
                type: String,
                required: true
            },
            submitCallback: Function,
            cancelSubmit: Function
        },
        data() {
            return {
                dictionaryForm: {
                    id: Number,
                    name: '',
                    value: '',
                    valid: true,
                    comment: '',
                    parentId: '',
                    parentIds: []
                },
                catalogs: [],
            }
        },
        methods: {
            onSubmit() {
                //取字典值目录最后一个为父目录
                //如果不存在父目录 则为null作为根目录
                let parentIds = this.dictionaryForm.parentIds;
                this.dictionaryForm.parentId = parentIds.length > 0 ?
                    parentIds[parentIds.length - 1] : null;
                let message = this.$message;
                let submitCallback = this.submitCallback;
                let initCatalog = this.initCatalog;
                this.$http.post(this.actionUrl, this.dictionaryForm)
                    .then(function (resp) {
                        message.success("请求成功");
                        initCatalog();
                        submitCallback();
                    });
            },
            initForm(value) {
                let form = this.dictionaryForm;
                if (value) {
                    form.id = value.id;
                    form.name = value.name;
                    form.value = value.value;
                    form.comment = value.comment;
                    form.parentId = value.parentId;
                    form.valid = value.valid;
                    form.parentIds = [];
                    for (let i in value.parentIds) {
                        form.parentIds.push(value.parentIds[i]);
                    }
                } else {
                    form.id = null;
                    form.name = '';
                    form.value = '';
                    form.comment = '';
                    form.parentId = null;
                    form.valid = true;
                    form.parentIds = [];
                }
            },
            initCatalog() {
                let message = this.$message;
                let thisData = this.$data;
                let utils = this.$Utils;
                this.$http.get("/dictionary/query").then(function (resp) {
                    thisData.catalogs = utils.treeify(resp);
                });
            }
        },
        watch: {
            initFormData: {
                immediate: true,
                handler(value) {
                    console.log("initFormData");
                    this.initForm(value);
                }
            }
        },
        mounted() {
            this.initCatalog();
        }
    }
</script>

<style scoped>

</style>