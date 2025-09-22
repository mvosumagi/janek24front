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
button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: white;
}

#logoutBtn {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #dc3545;
}

#loginBtn {
  position: fixed;
  top: 20px;
  right: 120px;
  background-color: #28a745;
}

#userBtn {
  position: fixed;
  top: 20px;
  right: 210px;
  background-color: #28a745;
}
</style>
