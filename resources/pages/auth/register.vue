<template>
  <el-row type="flex" justify="center">
    <el-col :span="12" class="card p-5">
      <div class="text-center my-4">
        <h2>Register</h2>
      </div>
      <el-form label-width="150px" status-icon :model="form" :rules="rules" ref="form">
        <el-form-item label="Username" prop="username" required>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email" required>
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Role" prop="role">
          <el-select v-model="form.role" placeholder="Role">
            <el-option label="Partner" value="partner"></el-option>
            <el-option label="Advertiser" value="advertiser"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Password" prop="password" required>
          <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="Repeat Pass" prop="password_confirmation" required>
          <el-input type="password" autocomplete="off" v-model="form.password_confirmation"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary" @click="submitForm">Register</el-button>
        </div>
        <div class="text-center mt-4">
          <span class="h5">Already got an account? <nuxt-link to="/auth/login">Login</nuxt-link></span>
        </div>
      </el-form>
    </el-col>
  </el-row>
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
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
      },
      rules:{
        username: [
          { required: true, message: 'Username is required', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
        ],
        password_confirmation: [
          { validator: passwordConfirmation, trigger: 'blur' },
        ],
        role: [
          { required: true, message: 'Role is required', trigger: 'blur' },
        ]
      },
    }
  },
  created() {
    if(this.$store.getters['auth/getAuthToken']){
      this.$router.push({'name': this.$store.getters['auth/getAuthInstance'].role})
    }
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'Error, please check the fields.',
          });
          return false;
        }
      });
    },
    async register(){
      try {
        await this.$axios.post('auth/register', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          role: this.form.role
        }).then((data) => {
          let user = data.data

          this.$notify({
            title: 'Success',
            message: 'User created successfully',
            type: 'success'
          });

          this.$store.dispatch('auth/setAuthInstance', user)
          this.$store.dispatch('auth/setAuthToken', user.token)

          this.$router.push({'name': user.role})
          
        }).catch((error) => {
          this.error = error.response.data
          if(this.error.constructor === Array){
            this.error.forEach((error) =>{
                setTimeout(() => {
                  this.$notify.error({
                    title: 'Error',
                    message: error.message,
                  });
                }, 100);
            })
          }else{
            this.$notify.error({
              title: 'Error',
              message: this.error.message,
            });
          }
        });
      } catch (error) {
        console.log(error)
      }
    }
  },
}
</script>