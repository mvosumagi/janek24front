<template>
  <div id="app">
    <template v-if="isLoggedIn">
      <button id="logoutBtn" @click="goToHome">Logout</button>
      <button id="userBtn" @click="goToUser">{{ username || 'User' }}</button>
      <!--      <button id="addNewServiceBtn" @click="goAddNewService">Add New Service</button>-->
    </template>
    <template v-else>
      <button id="loginBtn" @click="goToLogin">Login</button>
    </template>

    <router-link to="/email" class="mail-wrapper" aria-label="Open email">
      <i class="fas fa-envelope"></i> <span v-if="hasUnreadEmails" class="badge">{{ unreadEmailsCount }}</span>
      <span v-else class="no-new">No new</span>
    </router-link>

    <nav class="menu">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/my-service">My Services</router-link>
      |
      <router-link to="/my-orders">My Orders</router-link>
      |
      <router-link to="/search">Search</router-link>
    </nav>
    <router-view @event-user-logged-in="updateNavMenu"/>

  </div>
</template>

<script>

import SessionStorageService from "@/services/SessionStorageService";

export default {
  name: 'App',
  components: {},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      hasUnreadEmails: true,
      unreadEmailsCount: 3,
      username: ''
    }
      },

  methods: {
    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
      this.username = sessionStorage.getItem('username') || ''
    },
    goToLogin() {
      window.location.href = "login";
    },
    goToHome() {
      window.location.href = "home";
    },
    goToUser() {
      window.location.href = "user";
    },
    goAddNewService() {
      window.location.href = "service";
    },
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

.mail-wrapper {
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  position: relative;
}

.mail-wrapper i {
  font-size: 32px; /* larger icon */
  color: #333;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: red;
  color: white;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 11px; /* smaller text */
  font-weight: bold;
  line-height: 18px;
  text-align: center;
}


</style>
