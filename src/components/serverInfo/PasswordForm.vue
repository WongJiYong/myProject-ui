<template>
    <div id="AppPasswordForm">
        <el-form label-width="100px">
            <el-form-item label="密码">
                <el-input type="text">
                    <el-button type="text" slot="suffix" :circle="true" class="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="允许字符">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="A-Z" name="type"></el-checkbox>
                    <el-checkbox label="a-z" name="type"></el-checkbox>
                    <el-checkbox label="0-9" name="type"></el-checkbox>
                    <el-checkbox label="!%@#" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="至少使用数字">
                <el-input-number label="个数" v-model="form.nums"
                                 :min="0"
                                 :max="form.length"></el-input-number>
            </el-form-item>

            <el-form-item label="密码长度">
                <el-slider
                        :min="8"
                        :step="2"
                        :max="100"
                        v-model="form.length"
                        :show-input="true">
                </el-slider>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">使用密码</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AppPasswordForm",
        data() {
            return {
                form: {
                    password: '',
                    length: 16,
                    type: ['A-Z', 'a-z', '0-9', '!%@#'],
                    nums: 2
                }
            }
        },
        methods: {
            //生成从minNum到maxNum的随机数
            randomNum(minNum, maxNum) {
                if (arguments.length === 1) {
                    return parseInt(Math.random() * minNum + 1, 10);
                } else if (arguments.length === 2) {
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                } else {
                    return 0;
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>