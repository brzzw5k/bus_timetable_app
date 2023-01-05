<template>
    <div id="logout">
        <h1>Logging out ...</h1>
    </div>
</template>

<script>
export default {
  name: 'Logout',
  mounted () {
    this.logout()
    this.$router.push('/')
  },
  methods: {
    logout () {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
    }
  }
}
</script>
