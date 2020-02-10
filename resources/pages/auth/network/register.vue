<template>
    <div class="container">
      <div class="text-center my-3">
        <h2>Network Register</h2>
      </div>
      <div class="row">
        <div class="col-6 mx-auto">
          <Notification :message="error" v-if="error"/>
          <el-form label-width="120px">
            <el-form-item label="Username" required>
              <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="Email" required>
              <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="Password" required>
              <el-input type="password" autocomplete="off" v-model="password"></el-input>
            </el-form-item>
            <div class="text-center">
              <el-button type="primary" @click="register">Submit</el-button>
            </div>
            <div class="text-center mt-4">
              <span class="h5">Already got an account? <nuxt-link to="/auth/network/login">Login</nuxt-link></span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
import Notification from '@/components/utils/Notification'

export default {
  components: {
    Notification,
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.post('auth/network/register', {
          username: this.username,
          email: this.email,
          password: this.password
        }).catch(function (error) {
          console.log(error);
        })
        .then((data) => {
          let user = data.data
          
          this.$store.dispatch('auth/setAuthInstance', user)
          this.$store.dispatch('auth/setAuthToken', user.token)
        });

      } catch (e) {
        console.log(e)
        this.error = e.response.data.message
      }
    }
  }
}
</script>