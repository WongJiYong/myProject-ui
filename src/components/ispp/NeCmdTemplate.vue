<template>
    <div id="neCmdTemplate">
        <table>
            <tr>
                <th>name</th>
                <th>状态</th>
                <th>是否为反馈指令</th>
                <th></th>
            </tr>
            <tr v-for="neCommandTemplate in this.data.neCommandTemplates">
                <td>{{neCommandTemplate.name}}</td>
                <td>{{neCommandTemplate.state}}</td>
                <td>{{neCommandTemplate.isFeedbackCmd}}</td>
                <td>
                    <el-link type="primary" @click="detail(neCommandTemplate)">detail</el-link>
                </td>
            </tr>
        </table>
        <el-dialog
                title="网元指令模板详细信息"
                :visible.sync="dialogVisible"
                width="80%" hight="300px">
            <el-row>
                <el-col :span="12">
                    <table>
                        <tr>
                            <th>name</th>
                            <th>paraCode</th>
                            <th>取值方式</th>
                            <th>值</th>
                        </tr>
                        <tr v-for="cmdParam in oneCommandTemplatesDetail.neCommandParams">
                            <td>{{cmdParam.name}}</td>
                            <td>{{cmdParam.paraCode}}</td>
                            <td>{{cmdParam.getMethodEnum}}</td>
                            <td>
                                <div v-if="cmdParam.getMethodEnum === 'STATIC'">
                                    <span style="color: darkgray">{{cmdParam.value}}</span>
                                </div>
                                <div v-else-if="cmdParam.getMethodEnum === 'RULE'">
                                    <el-link style="color: red" @click="queryNeCmdParamDetail(cmdParam)">
                                        {{cmdParam.ntrCode}}<i class="el-icon-view el-icon--right"></i></el-link>
                                </div>
                                <div v-else-if="cmdParam.getMethodEnum === 'PARA'">
                                    <el-link style="color: green" @click="queryNeCmdParamDetail(cmdParam)">
                                        {{cmdParam.wopCode}}<i class="el-icon-view el-icon--right"></i></el-link>

                                </div>
                                <div v-else>
                                    不支持的取值方式
                                </div>
                            </td>
                        </tr>
                    </table>
                </el-col>
                <el-col :span="12">
                    <div v-if="oneCmdParamQueryCondition">
                        <ne-cmd-template-param-detail
                                v-bind:query-condition="oneCmdParamQueryCondition"></ne-cmd-template-param-detail>
                    </div>

                </el-col>
            </el-row>
            <hr>
            <el-row>
                <el-input type="textarea" v-model="oneCommandTemplatesDetail.templateContent"></el-input>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import RuleEngine from "./RuleEngine";
    import NeCmdTemplateParamDetail from "./NeCmdTemplateParamDetail";

    export default {
        name: "NeCmdTemplate",
        components: {NeCmdTemplateParamDetail, RuleEngine},
        props: {
            queryCondition: Object,
        },
        data() {
            return {
                dialogVisible: false,
                oneCmdParamQueryCondition: undefined,
                oneCommandTemplatesDetail: {
                    oneParamDetail: {},
                    neCommandParams: [],
                    templateContent: "",
                },
                data: {
                    neCommandTemplates: []
                }
            }
        },
        methods: {
            detail(oneCmdTemplateInfo) {
                this.oneCommandTemplatesDetail.templateContent = oneCmdTemplateInfo.neCmdTemplateVersion.templateContent;
                let message = this.$message;
                let params = Object.assign({}, this.queryCondition);
                params.nctCode = oneCmdTemplateInfo.nctCode;
                let vData = this.$data;
                this.$http.post("/neCommandParam/info", params).then(function (response) {
                    vData.dialogVisible = true;
                    vData.oneCommandTemplatesDetail.neCommandParams = response;
                });
            },
            queryNeCmdParamDetail(oneParam) {
                let param = Object.assign({}, this.queryCondition);
                param.ntrCode = oneParam.ntrCode;
                param.wopCode = oneParam.wopCode;
                param.getMethodEnum = oneParam.getMethodEnum;
                this.oneCmdParamQueryCondition = param;
            }
        },
        mounted() {
            let message = this.$message;
            let vData = this.data;
            this.$http.post("/neCommandTemplate/info", this.queryCondition).then(function (response) {
                vData.neCommandTemplates = response;
            });
        }
    }
</script>

<style scoped>

</style>