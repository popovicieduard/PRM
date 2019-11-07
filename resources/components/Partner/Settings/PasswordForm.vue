<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :span="24" class="my-1">
                    <span class="h2 text-capitalize">Change Password</span>
                </el-col>
            </el-row>
        </div>
        <el-row type="flex" justify="center">
            <el-col :span="14">
                <el-card shadow="never">
                    <el-form :model="password_form_data" label-width="180px">
                        <el-form-item label="Old Password:" class="mb-1">
                            <el-input show-password v-model="password_form_data.old_password"></el-input>
                        </el-form-item>
                        <hr>
                        <el-form-item label="New Password:" class="mb-1">
                            <el-input show-password v-model="password_form_data.new_password"></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm New Password:" class="mb-1">
                            <el-input show-password v-model="password_form_data.confirm_new_password"></el-input>
                        </el-form-item>
                        <hr>
                        <div class="text-center">
                            <el-button 
                            type="primary" 
                            @click="submitForm" 
                            style="width: 100%"
                            :loading="form_loading">
                            Change Password
                            </el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>

export default {
    data() {
        return {
            password_form_data: {
                old_password: '',
                new_password: '',
                confirm_new_password: ''
            },
            form_loading: false
        }
    },
    methods: {
        submitForm(){
            this.form_loading = true;
            setTimeout(() => {
                this.form_loading = false;
            }, 2000);
        }
    },
}
</script>

<style lang="scss">

</style>