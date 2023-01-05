<template>
  <div id="login">
    <h1>Login</h1>
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { BACKEND_URL } from '../config'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios
        .post(BACKEND_URL + '/api/login', {
          login: this.username,
          password: this.password
        })
        .then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', this.username)
          this.$router.push('/')
        })
    }
  }
}

</script>
