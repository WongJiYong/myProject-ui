<template>
    <div id="neDevice">
        <el-row :span="24">
            <el-col :span="12">
                <table>
                    <tr>
                        <th>name</th>
                        <th>ip</th>
                        <th>port</th>
                        <th>deviceStateCode</th>
                        <th>areaId</th>
                        <th>waCode</th>
                        <th></th>
                    </tr>
                    <tr v-for="neDevice in neDevices">
                        <td>{{neDevice.name}}</td>
                        <td>{{neDevice.ip}}</td>
                        <td>{{neDevice.port}}</td>
                        <td>{{neDevice.deviceStateCode}}</td>
                        <td>{{neDevice.areaId}}</td>
                        <td>{{neDevice.waCode}}</td>
                        <td>
                            <el-link type="primary" @click="dispatcherRule(neDevice)">detail</el-link>
                        </td>
                    </tr>
                </table>
            </el-col>
            <el-col :span="12">
                <div v-if="ruleInfo">
                    <div v-if="mappingRule === 'RULE'">
                        <h1>规则映射</h1>
                        <table>
                            <tr>
                                <th>wopName</th>
                                <th>value</th>
                            </tr>
                            <tr v-for="item in ruleInfo">
                                <td>{{item.wopName}}</td>
                                <td>{{item.value}}</td>
                            </tr>
                        </table>
                    </div>
                    <div v-else-if="mappingRule === 'MAPPING'"></div>
                    <div v-if="mappingRule"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "NeDevice",
        props: {
            queryCondition: Object,
            mappingRule: String
        },
        data() {
            return {
                ruleInfo: undefined,
                neDevices: []
            };
        },
        watch: {
            mappingRule: function () {
                alert("1");
            }
        },
        methods: {
            dispatcherRule(neDevice) {
                let params = Object.assign({}, this.queryCondition);
                params.ndCode = neDevice.ndCode;
                let vData = this.$data;
                this.$http.post("/neDevice/rule/" + this.mappingRule, params).then(function (response) {
                    vData.ruleInfo = response;
                });
            }
        },
        mounted() {
            let message = this.$message;
            let vData = this.$data;
            this.$http.post("/neDevice/info", this.queryCondition).then(function (response) {
                vData.neDevices = response;
            });
        }
    }
</script>

<style scoped>

</style>