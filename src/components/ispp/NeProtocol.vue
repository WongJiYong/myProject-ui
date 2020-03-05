<template>
    <div id="neProtocol">
        name:
        {{data.neProtocol.name}}<br/>
        maxTimeout:
        {{data.neProtocol.maxTimeout}}<br/>
        retryTimes:
        {{data.neProtocol.retryTimes}}<br/>
        needHeartBeat:
        {{data.neProtocol.needHeartBeat}}<br/>
        retryInter:
        {{data.neProtocol.retryInter}}<br/>
        effectDate:
        {{data.neProtocol.effectDate}}<br/>
        expireDate:
        {{data.neProtocol.expireDate}}<br/>
        maxConnect:
        {{data.neProtocol.maxConnect}}<br/>
        sendMod:
        {{data.neProtocol.sendMod}}<br/>
        comments:
        {{data.neProtocol.comments}}<br/>
        <div v-if="data.neProtocol.pbBusinessObj">
            businessObjName:
            {{data.neProtocol.pbBusinessObj.businessObjName}}<br/>
            className:
            {{data.neProtocol.pbBusinessObj.className}}<br/>
            methodName:
            {{data.neProtocol.pbBusinessObj.methodName}}<br/>
            createDate:
            {{data.neProtocol.pbBusinessObj.createDate}}<br/>
            stateDate:
            {{data.neProtocol.pbBusinessObj.stateDate}}<br/>
            state:
            {{data.neProtocol.pbBusinessObj.state}}<br/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NeProtocol",
        props: {
            queryCondition: Object,
        },
        data() {
            return {
                data: {
                    neProtocol: {}
                }
            };
        },
        mounted() {
            let vData = this.data;
            this.$http.post("/neProtocol/info", this.queryCondition).then(function (response) {
                vData.neProtocol = response;
            });
        }
    }
</script>

<style scoped>

</style>