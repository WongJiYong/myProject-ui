<template>
    <div id="RuleEngine">
        <div v-if="neTranRule">
            name:{{neTranRule.name}}<br/>
            getMethod:{{neTranRule.ruleGetMethodEnum}}<br/>
            <!--   规则取值-动态组件取值 -->
            <div v-if="neTranRule.ruleGetMethodEnum=== 'DYNAMIC_SCRIPT' ">
                <el-row>
                    <table>
                        <tr>
                            <td colspan="3">规则引擎参数</td>
                        </tr>
                        <tr>
                            <th>code</th>
                            <th>wopName</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="rulePara in neTranRule.neTranRuleParaVos">
                            <td>{{rulePara.code}}</td>
                            <td>{{rulePara.wopName}}</td>
                            <td>
                                <el-link type="primary" @click="queryParamDetail(rulePara)">detail</el-link>
                            </td>
                        </tr>
                    </table>
                </el-row>
                <el-row>
                    规则引擎：{{neTranRule.neJavaEngineWithBLOBs.name}}<br/>
                    state：{{neTranRule.neJavaEngineWithBLOBs.state}}<br/>
                    规则描述：<br/>{{neTranRule.neJavaEngineWithBLOBs.ruleDesc}}<br/>
                    规则内容：<br/>
                    <el-input type="textarea" :value="neTranRule.neJavaEngineWithBLOBs.ruleContent"></el-input>
                </el-row>
            </div>
            <!--   规则取值-映射取值 -->
            <div v-else-if="neTranRule.ruleGetMethodEnum=== 'MAPPING' ">
                <el-row>
                    映射取值
                </el-row>
            </div>
            <div v-else>
                <el-row>
                    其他取值
                </el-row>
            </div>
        </div>
        <el-dialog
                title="参数详细信息"
                :visible.sync="dialogVisible"
                :modal="false"
                width="70%"
                center>
            <div v-if="dialogVisible">
                <wo-order-param v-bind:query-condition="woOrderParamQueryCondition"></wo-order-param>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import WoOrderParam from "./WoOrderParam";

    export default {
        name: "RuleEngine",
        components: {WoOrderParam},
        props: {
            queryCondition: {
                ntrCode: "",
                getMethodEnum: "",
                sisCode: "",
                dbType: "",
                networkType: ""
            }
        },
        data() {
            return {
                neTranRule: undefined,
                woOrderParamQueryCondition: {
                    wopCode: '',
                },
                dialogVisible: false
            }
        },
        methods: {
            queryRuleEngine() {
                let message = this.$message;
                let vData = this.$data;
                this.$http.post("/neCommandParam/detail", this.queryCondition)
                    .then(function (response) {
                        vData.neTranRule = response;
                    });
            },
            queryParamDetail(woOrderparam) {
                //初始化 查询指令参数
                let params = Object.assign({}, this.queryCondition);
                params.wopCode = woOrderparam.wopCode;
                this.woOrderParamQueryCondition = params;
                this.dialogVisible = true;

            }
        },
        watch: {
            queryCondition: function () {
                this.queryRuleEngine();
            }
        },
        mounted() {
            this.queryRuleEngine();
        }
    }
</script>

<style scoped>

</style>