<template>
  <div id="app">
    <template v-if="isLoggedIn">
      <button id="logoutBtn" @click="goToHome">Logout</button>
      <button id="userBtn" @click="goToUser">User</button>
    </template>
    <template v-else>
      <button id="loginBtn" @click="goToLogin">Login</button>
    </template>

    <nav class="menu">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/service">Service</router-link>
      |
      <router-link to="/my-orders">My Orders</router-link>
      |
      <router-link to="/search">Search</router-link>
    </nav>
    <router-view @event-user-logged-in="updateNavMenu"/>

  </div>
</template>

<script>
import Buttons from './components/image/Buttons.vue';
import SessionStorageService from "@/services/SessionStorageService";

export default {
  name: 'App',
  components: {
    Buttons
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    }

  },

  methods: {
    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
    },

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

<style>
body {
  background-color: #f0f0f0;
  color: #333333;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 40px;
}

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
