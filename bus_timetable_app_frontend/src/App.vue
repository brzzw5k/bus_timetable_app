<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <h1 class="navbar-brand" href="#">Bus Timetable App</h1>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a v-if=!isLoggedIn() class="nav-item nav-link" v-bind:href="'/timetable'">Timetable</a>
            <a v-if=!isLoggedIn() class="nav-item nav-link" v-bind:href="'/login'">Login</a>
            <a v-if=!isLoggedIn() class="nav-item nav-link" v-bind:href="'/register'">Register</a>
            <a v-if=isLoggedIn() class="nav-item nav-link" v-bind:href="'/timetable'">My Timetable</a>
            <a v-if=isLoggedIn() class="nav-item nav-link" v-bind:href="'/logout'">Logout</a>
          </div>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { isLoggedIn } from './util'

export default {
  methods: {
    isLoggedIn
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav-item {
  text-decoration: none;
  color: #2c3e50;
  padding: 1em;
}
</style>
