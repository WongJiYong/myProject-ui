<template>
    <el-row>
        <template v-for="button in buttons">
            <el-button type="primary" plain v-if="button.enabled">
                button.text
                <i v-if="button.locked" class="el-icon-lock"></i>
                <i v-else :class="correlateIcon"></i>
            </el-button>
        </template>
    </el-row>
</template>

<script>
    const ICON = {
        'add': 'el-icon-plus',
        'remove': 'el-icon-delete',
        'modify': 'el-icon-edit',
        'query': 'el-icon-view',
    };
    export default {
        name: "cust-buttons",
        methods: {
            correlateIcon(button) {
                let i = ICON[button.type];
                return i ? i : '';
            }
        },
        mounted() {

        },
        props: {
            buttons: []
        }
    }
</script>

<style scoped>

</style>