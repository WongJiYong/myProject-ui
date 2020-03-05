<template>
    <div id="NeCmdTemplateParamDetail">
        <div v-if="queryCondition.getMethodEnum === 'PARA'">
            <wo-order-param v-bind:query-condition="queryCondition"></wo-order-param>
        </div>
        <div v-else-if="queryCondition.getMethodEnum === 'RULE'">
            <rule-engine v-bind:query-condition="queryCondition"></rule-engine>
        </div>
    </div>
</template>

<script>
    import RuleEngine from "./RuleEngine";
    import WoOrderParam from "./WoOrderParam";

    export default {
        name: "NeCmdTemplateParamDetail",
        components: {WoOrderParam, RuleEngine},
        props: {
            queryCondition: {
                ntrCode: String,
                wopCode: String,
                getMethodEnum: String,
                sisCode: String,
                dbType: String,
                networkType: String
            }
        }
    }
</script>