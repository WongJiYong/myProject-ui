<template>
    <div id="NeCommunicateProtocol">
        name:
        {{data.neCommunicateProtocol.name}}<br/>
        isSyn:
        {{data.neCommunicateProtocol.isSyn}}<br/>
        businessObjName:
        <div v-if="data.neCommunicateProtocol.pbBusinessObj">
            {{data.neCommunicateProtocol.pbBusinessObj.businessObjName}}<br/>
            state:
            {{data.neCommunicateProtocol.pbBusinessObj.state}}<br/>
            className:
            {{data.neCommunicateProtocol.pbBusinessObj.className}}<br/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NeCommunicateProtocol",
        props: {
            queryCondition: Object,
        },
        data() {
            return {
                data: {
                    neCommunicateProtocol: {}
                }
            };
        },
        mounted() {
            let message = this.$message;
            let vData = this.data;
            this.$http.post("/neCommunicateProtocol/info", this.queryCondition).then(function (response) {
                vData.neCommunicateProtocol = response;
            });
        }
    }
</script>

<style scoped>

</style>