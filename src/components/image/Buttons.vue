<template>
  <div>
    <button id="loginBtn" @click="goToLogin">Login</button>
    <button id="logoutBtn" @click="goToHome">Logout</button>
    <button id="userBtn" @click="goToUser">User</button>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  methods: {
    goToLogin() {
      window.location.href = "login";
    },
    goToHome() {
      window.location.href = "home";
    },
    goToUser() {
      window.location.href = "user";
    }
  }
}
</script>

<style scoped>

</style>
