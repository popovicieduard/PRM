<template>
  <el-row type="flex" justify="center">
    <el-col :span="12" class="card p-5">
      <div class="text-center my-4">
        <h2>Login</h2>
      </div>
      <el-form label-width="120px" status-icon :model="form" :rules="rules" ref="form">
        <el-form-item label="Email" prop="email" required>
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" required>
          <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary" @click="submitForm">Login</el-button>
        </div>
        <div class="text-center mt-4">
          <span class="h5">Don't have an account? <nuxt-link to="/auth/register">Register</nuxt-link></span>
        </div>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules:{
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
        ],
      },
      error: null
    }
  },
  created() {
    const token = this.$store.getters['auth/getAuthToken']
    if(token){
      const instance = this.$store.getters['auth/getAuthInstance']
      if(instance){
        if(instance.role){
          this.$router.push({'name': instance.role})
        }
      }
    }
  },
  methods: {
    submitForm(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'Error, please check the fields.',
          });
          return false;
        }
      });
    },
    async login() {
      try {
        await this.$axios.post('auth/login', {
          email: this.form.email,
          password: this.form.password
        }).then((data) => {
          let user = data.data

          this.$notify({
            title: 'Success',
            message: 'Logged in successfully',
            type: 'success'
          });

          this.$store.dispatch('auth/setAuthInstance', user)
          this.$store.dispatch('auth/setAuthToken', user.token)

          this.$router.push({'name': user.role})
          
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
    },
  },
}
</script>