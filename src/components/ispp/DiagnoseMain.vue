<template>
    <div id="diagnoseMain">
        <el-row>
            <el-col :span="24">
                <div class="grid-content">
                    <el-form :inline="true" :model="diagnoseForm" class="demo-form-inline">
                        <el-form-item label="工单标识">
                            <el-input v-model="diagnoseForm.serialId" placeholder="工单标识"></el-input>
                        </el-form-item>
                        <el-form-item label="CRM编码">
                            <el-input v-model="diagnoseForm.crmCode" placeholder="CRM编码"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="dbType">
                            <el-radio-group v-model="diagnoseForm.dbType">
                                <el-radio label="ONLINE">在途库</el-radio>
                                <br/>
                                <el-radio label="HISTORICAL">历史库</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="" prop="networkType">
                            <el-radio-group v-model="diagnoseForm.networkType">
                                <el-radio label="G">固网</el-radio>
                                <br/>
                                <el-radio label="C">C网</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-light">
                    <el-collapse :value="['neType']">
                        <el-collapse-item title="入库记录" name="inOrderRecord">
                            <el-table :data="panelsData.inOrderRecords"
                                      style="width: 100%;margin-bottom: 20px;"
                                      row-key="recordId"
                                      border
                                      :highlight-current-row="true">
                                <el-table-column
                                        prop="accNbr"
                                        label="accNbr">
                                </el-table-column>
                                <el-table-column
                                        prop="serialId"
                                        label="serialId">
                                </el-table-column>
                                <el-table-column
                                        prop="createTime"
                                        label="createTime">
                                </el-table-column>
                                <el-table-column
                                        prop="uuid"
                                        label="uuid">
                                </el-table-column>
                                <el-table-column
                                        prop="partitionCode"
                                        label="partitionCode">
                                </el-table-column>
                                <el-table-column
                                        prop="outTache"
                                        label="outTache">
                                </el-table-column>
                                <el-table-column
                                        prop="fromSystem"
                                        label="fromSystem">
                                </el-table-column>
                            </el-table>
                            <el-table :data="orderErrInfos"
                                      style="width: 100%;margin-bottom: 20px;"
                                      row-key="errorSerialId"
                                      border
                                      :highlight-current-row="true">
                                <el-table-column
                                        prop="uuid"
                                        label="uuid">
                                </el-table-column>
                                <el-table-column
                                        prop="createDate"
                                        label="createDate">
                                </el-table-column>
                                <el-table-column
                                        prop="errorContent"
                                        label="errorContent">
                                </el-table-column>
                            </el-table>
                            <div></div>
                        </el-collapse-item>
                        <el-collapse-item title="工单类型匹配" name="orderType">
                            <el-form :inline="true" :model="orderTypeForm" class="demo-form-inline">
                                <el-form-item label="目标工单类型">
                                    <el-input v-model="orderTypeForm.woOrderType"
                                              placeholder="目标工单类型name/code"></el-input>
                                </el-form-item>
                                <el-form-item label="外部系统">
                                    <el-input v-model="orderTypeForm.sisCode" placeholder="外部系统"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="dbType">
                                    <el-radio-group v-model="orderTypeForm.dbType">
                                        <el-radio label="ONLINE">在途库</el-radio>
                                        <br/>
                                        <el-radio label="HISTORICAL">历史库</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="" prop="networkType">
                                    <el-radio-group v-model="orderTypeForm.networkType">
                                        <el-radio label="G">固网</el-radio>
                                        <br/>
                                        <el-radio label="C">C网</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="queryOutOrderTypeRule">查询</el-button>
                                </el-form-item>
                            </el-form>

                            <div v-for=" (orderType, index) in panelsData.outOrderType">
                                <el-table :data="orderType.outTypeMatchRuleVoList"
                                          style="width: 100%;margin-bottom: 20px;"
                                          row-key="recordId"
                                          border
                                          :highlight-current-row="true">
                                    <el-table-column
                                            v-bind:label="(index + 1) + '.外部工单:    ' + orderType.orderTypeName">
                                        <el-table-column
                                                prop="name"
                                                label="参数名称"
                                                min-width="7%">
                                        </el-table-column>
                                        <el-table-column
                                                prop="matched"
                                                label="匹配结果"
                                                min-width="5%">
                                        </el-table-column>
                                        <el-table-column
                                                prop="xmlValue"
                                                label="xml取值"
                                                min-width="7%">
                                        </el-table-column>
                                        <el-table-column
                                                prop="rule"
                                                label="映射规则"
                                                min-width="30%">
                                        </el-table-column>
                                        <el-table-column
                                                prop="xmlPath"
                                                label="xml路径"
                                                min-width="40%">
                                        </el-table-column>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="网元类型" name="neType">
                            <el-form :inline="true" :model="neNeTypeForm" class="demo-form-inline">
                                <el-form-item label="网元类型">
                                    <el-input v-model="neNeTypeForm.neNeTypeCodeOrName"
                                              placeholder="code/name"></el-input>
                                </el-form-item>
                                <el-form-item label="外部系统">
                                    <el-input v-model="neNeTypeForm.sisCode" placeholder="外部系统"></el-input>
                                </el-form-item>
                                <el-form-item label="" prop="dbType">
                                    <el-radio-group v-model="neNeTypeForm.dbType">
                                        <el-radio label="ONLINE">在途库</el-radio>
                                        <br/>
                                        <el-radio label="HISTORICAL">历史库</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="" prop="networkType">
                                    <el-radio-group v-model="neNeTypeForm.networkType">
                                        <el-radio label="G">固网</el-radio>
                                        <br/>
                                        <el-radio label="C">C网</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="queryNeNeTypeInfo">查询</el-button>
                                </el-form-item>
                            </el-form>
                            <br/>
                            <div v-for="neNeTypeInfo in this.neNeType">
                                <h1>网元类型：{{ neNeTypeInfo.name }}
                                    &nbsp;&nbsp;&nbsp;&nbsp;目录:{{neNeTypeInfo.catalogs}}</h1>
                                映射规则: {{ neNeTypeInfo.neDispatchRuleEnum }}
                                <div v-for="neNeSubTypeInfo in neNeTypeInfo.neNeSubType">
                                    <h1>网元细类：{{neNeSubTypeInfo.name}} </h1>
                                    state: {{neNeSubTypeInfo.state}}
                                    reverseState: {{neNeSubTypeInfo.reverseState}}
                                    <el-button type="text" @click="neNeSubTypeDetail(neNeSubTypeInfo)">detail
                                    </el-button>
                                    <el-tabs v-if="neNeSubTypeInfo.detail" tab-position="left">
                                        <el-tab-pane label="接口机">
                                            <ne-device v-bind:query-condition="{
                                            'nnstCode':neNeSubTypeInfo.nnstCode,
                                            'sisCode': neNeTypeForm.sisCode,
                                            'dbType': neNeTypeForm.dbType,
                                            'networkType': neNeTypeForm.networkType,
                                            'nntCode':neNeTypeInfo.nntCode }"
                                                       v-bind:mapping-rule="neNeTypeInfo.neDispatchRuleEnum"></ne-device>
                                        </el-tab-pane>
                                        <el-tab-pane label="指令模板">
                                            <ne-cmd-template v-bind:query-condition="{
                                            'nnstCode': neNeSubTypeInfo.nnstCode,
                                            'sisCode': neNeTypeForm.sisCode,
                                            'dbType': neNeTypeForm.dbType,
                                            'networkType': neNeTypeForm.networkType
                                        }"></ne-cmd-template>
                                        </el-tab-pane>
                                        <el-tab-pane label="网元协议">
                                            <ne-protocol v-bind:query-condition="{
                                            'npCode': neNeSubTypeInfo.npCode,
                                            'sisCode': neNeTypeForm.sisCode,
                                            'dbType': neNeTypeForm.dbType,
                                            'networkType': neNeTypeForm.networkType
                                        }"></ne-protocol>
                                        </el-tab-pane>
                                        <el-tab-pane label="通讯协议">
                                            <ne-communicate-protocol v-bind:query-condition="{
                                            'communicateProtocolId': neNeSubTypeInfo.communicateProtocolId,
                                            'sisCode': neNeTypeForm.sisCode,
                                            'dbType': neNeTypeForm.dbType,
                                            'networkType': neNeTypeForm.networkType
                                        }"
                                            ></ne-communicate-protocol>
                                        </el-tab-pane>
                                    </el-tabs>
                                    <hr>
                                </div>
                            </div>
                        </el-collapse-item>

                    </el-collapse>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Vue from 'vue'
    import NeDevice from "./NeDevice";
    import NeCmdTemplate from "./NeCmdTemplate";
    import NeProtocol from "./NeProtocol";
    import NeCommunicateProtocol from "./NeCommunicateProtocol";

    export default {
        name: "diagnoseMain",
        components: {NeCommunicateProtocol, NeProtocol, NeCmdTemplate, NeDevice},
        data() {
            return {
                neNeType: [],
                diagnoseForm: {
                    serialId: "13856081313695",
                    crmCode: "",
                    dbType: "ONLINE",
                    networkType: "G",
                },
                orderTypeForm: {
                    woOrderType: "C_282",
                    woOrderTypeName: null,
                    sisCode: "C_2",
                    dbType: "ONLINE",
                    networkType: "G",
                },
                neNeTypeForm: {
                    neNeTypeCodeOrName: null,
                    nntCode: null,
                    name: null,
                    sisCode: 'C_2',
                    dbType: 'ONLINE',
                    networkType: "G",
                },
                panelsData: {
                    neDevice: [],
                    inOrderRecords: [],
                    outOrderType: []
                }
            }
        },
        computed: {
            orderErrInfos() {
                let inOrderRecords = this.panelsData.inOrderRecords;
                let arrayStr = '[].concat([]';
                for (let i = 0; i < inOrderRecords.length; i++) {
                    arrayStr += ', inOrderRecords[' + i + '].woOrderErrorLogs';
                }
                arrayStr += ');';
                return eval(arrayStr);
            }
        },
        watch: {
            'neNeTypeForm.neNeTypeCodeOrName': function (newValue, oldValue) {
                if (newValue.match("$C_.*")) {
                    this.neNeTypeForm.nntCode = newValue;
                    this.neNeTypeForm.name = null;
                } else {
                    this.neNeTypeForm.name = newValue;
                    this.neNeTypeForm.nntCode = null;
                }
            },
            neNeType: function () {
                for (let i = 0; i < this.neNeType.length; i++) {
                    let neNeTypeInfo = this.neNeType[i];
                    let message = this.$message;
                    let param = Object.assign({}, this.neNeTypeForm);
                    param.nntCode = neNeTypeInfo.nntCode;
                    this.$http.post("/neNeSubType/info", param).then(function (response) {
                        Vue.set(neNeTypeInfo, 'neNeSubType', response);
                    });
                }
            }
        },
        methods: {
            onSubmit() {
                let panelsData = this.panelsData;
                let diagnoseForm = this.diagnoseForm;
                let message = this.$message;
                console.log(diagnoseForm);
                this.$http.post("/order/record", this.diagnoseForm).then(function (response) {
                    panelsData.inOrderRecords = response;
                });
            },
            queryOutOrderTypeRule() {
                let message = this.$message;
                let panelsData = this.panelsData;
                this.$http.post("/order/type/queryRule", this.orderTypeForm).then(function (response) {
                    panelsData.outOrderType = response;
                });
            },
            queryNeNeTypeInfo() {
                let message = this.$message;
                let vData = this.$data;
                this.$http.post("/neNeType/info", this.neNeTypeForm)
                    .then(function (response) {
                        for (let i = 0; i < vData.neNeType.length; i++)
                            vData.neNeType.pop();
                        for (let i = 0; i < response.length; i++)
                            vData.neNeType.push(response[i]);
                    });
            },
            neNeSubTypeDetail(neNeSubType) {
                if (neNeSubType.detail) {
                    neNeSubType.detail = false;
                } else {
                    Vue.set(neNeSubType, 'detail', true);
                }
            },

        }
    }
</script>
<style>

</style>