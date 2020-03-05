<template>
    <div id="woOrderParam">
        name:{{woOrderParam.name}}<br/>
        state:{{woOrderParam.state}}<br/>
        paraType:{{woOrderParam.paraType}}<br/>
        <table>
            <tr>
                <td>name</td>
                <td>nodePath</td>
                <td>comments</td>
                <td>来源系统</td>
                <td>isReflect</td>
                <td>paraType</td>
                <td>isStored</td>
            </tr>
            <tr v-for="spParaInfo in woOrderParam.spParaInfoList">
                <td>{{spParaInfo.name}}</td>
                <td>
                    <el-input type="text" :value="spParaInfo.nodePath"></el-input>
                </td>
                <td>
                    <el-input type="text" :value="spParaInfo.comments"></el-input>
                </td>
                <td>{{spParaInfo.sisCode}}</td>
                <td>{{spParaInfo.isReflect}}</td>
                <td>{{spParaInfo.paraType}}</td>
                <td>{{spParaInfo.isStored}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "WoOrderParam",
        props: {
            queryCondition: {
                wopCode: String,
                sisCode: String,
                dbType: String,
                networkType: String
            }
        },
        data() {
            return {
                woOrderParam: {
                    name: '',
                    state: '',
                    paraType: '',
                    spParaInfoList: []
                }
            }
        },
        methods: {
            queryParamDetail() {
                //初始化 查询指令参数
                let vData = this.$data;
                this.$http.post("/woOrderParam/one/detail/", this.queryCondition).then(function (response) {
                    vData.woOrderParam = response;
                });
            }
        },
        watch: {
            queryCondition: function () {
                this.queryParamDetail();
            }
        },
        mounted() {
            this.queryParamDetail();
        }
    }
</script>

<style scoped>

</style>