<template>
    <div id="processForm">
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <div class="grid-content">
                    <el-form :model="serverInfoForm" label-width="80px">
                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="IP">
                                    <el-input v-model="serverInfoForm.ip"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="端口号">
                                    <el-input v-model="serverInfoForm.port"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="pid">
                                    <el-input v-model="serverInfoForm.pid" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="进程状态">
                                    <el-input v-model="serverInfoForm.status" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="进程名">
                            <el-input v-model="serverInfoForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="根路径">
                            <el-input v-model="serverInfoForm.rootPath"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="启动脚本">
                                    <el-input v-model="serverInfoForm.startupSh"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="关闭脚本">
                                    <el-input v-model="serverInfoForm.shutdownSh"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="附加信息">
                            <el-input type="textarea" v-model="serverInfoForm.detail"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button @click="cancelSubmit">取消</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "processForm",
        data() {
            return {
                serverInfoForm: {
                    id: '',
                    ip: '',
                    server_id: '',
                    pid: '',
                    name: '',
                    port: '',
                    detail: '',
                    rootPath: '',
                    startupSh: '',
                    shutdownSh: '',
                    status: ''
                }
            }
        },
        methods: {
            onSubmit: function () {

            },
            cancelSubmit: function () {

            }
        }
    }
</script>

<style scoped>

</style>