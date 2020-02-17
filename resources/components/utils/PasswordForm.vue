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
                    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
                        <el-form-item label="Old Password:" prop="old_password" class="my-3">
                            <el-input show-password v-model="form.old_password"></el-input>
                        </el-form-item>
                        <hr>
                        <el-form-item label="New Password:" prop="password" class="my-3">
                            <el-input show-password v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm Password:" prop="password_confirmation" class="my-3">
                            <el-input show-password v-model="form.password_confirmation"></el-input>
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
        var passwordConfirmation = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Confirm password is required'));
            } else if (value !== this.form.password) {
                callback(new Error('Password don\'t match'));
            } else {
                callback();
            }
        };
        return {
            form: {
                old_password: '',
                password: '',
                password_confirmation: ''
            },
            form_loading: false,
            rules:{
                old_password: [
                    { required: true, message: 'Old Password is required', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'New Password is required', trigger: 'blur' },
                ],
                password_confirmation: [
                    { validator: passwordConfirmation, required: true, trigger: 'blur' },
                ]
            },
        }
    },
    methods: {
        submitForm() {
        this.$refs['form'].validate((valid) => {
            if (valid) {
            this.updateUser()
            } else {
            this.$notify.error({
                title: 'Error',
                message: 'Error, please check the fields.',
            });
            return false;
            }
        });
        },
        async updateUser(){
        try {
            await this.$axios.patch('auth/user', {
                old_password: this.form.old_password,
                password: this.form.password,
                password_confirmation: this.form.password_confirmation,
            }).then((data) => {
            let user = data.data

            this.$notify({
                title: 'Success',
                message: 'User updated successfully',
                type: 'success'
            });

            this.$store.dispatch('auth/setAuthInstance', user)
            this.$store.dispatch('auth/setAuthToken', user.token)
            
            })
        } catch (error) {
            let _error = error.response.data
            if(_error.constructor === Array){
                _error.forEach((error) =>{
                setTimeout(() => {
                    this.$notify.error({
                    title: 'Error',
                    message: error.message,
                    });
                }, 100);
                })
            }else{
                if(this){
                this.$notify.error({
                    title: 'Error',
                    message: _error.message,
                });
                }
            }
        }
        }
    }
}
</script>

<style lang="scss">

</style>