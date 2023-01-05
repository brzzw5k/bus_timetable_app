<template>
    <div id="register">
        <h1>Register</h1>
        <form v-on:submit.prevent="register">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" >
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" >
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
</template>

<script>
import { BACKEND_URL } from '../config'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$http
        .post(BACKEND_URL + '/api/register', {
          login: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push('/login')
        })
    }
  }
}

</script>
