<template>
    <div id="catalogForm">
        <el-form :model="form"
                 ref="catalogTemplate.form"
                 label-width="80px">
            <el-form-item label="目录名">
                <el-input v-model="catalogTemplate.form.label"></el-input>
            </el-form-item>
            <el-form-item label="目录序号">
                <el-input-number v-model="catalogTemplate.form.seq" controls-position="right" :min="1"
                                 :max="10000"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="cancelForm()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import catalog from '../../api/server/catalog'

    export default {
        name: "CatalogForm",
        props: {
            catalogTemplate: {
                action: String,
                form: {
                    id: String,
                    label: String,
                    seq: Number,
                    parent: Number,
                    type: String
                },
                submitCallback: Function,
                cancelSubmit: Function
            },
            submitCallback: Function,
            cancelSubmit: Function
        },
        data() {
            return {}
        },
        methods: {
            submitForm() {
                let vData = this.catalogTemplate;
                let callBack = vData.submitCallback ? vData.submitCallback : this.submitCallback;
                catalog[vData.action](vData.form, function (resp) {
                    callBack && callBack(resp, vData.form);
                });
            },
            cancelForm() {
                let vData = this.catalogTemplate;
                let callBack = vData.cancelSubmit ? vData.cancelSubmit : this.cancelSubmit;
                callBack && callBack();
            }
        }
    }
</script>