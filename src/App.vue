<template>
  <div id="app">
    <header class="topbar">
      <nav class="menu">
        <router-link to="/home">Home</router-link>
        <div v-if="isLoggedIn">
        <router-link to="/my-services">My Services</router-link>
          <router-link to="/my-orders">My Orders</router-link>
        </div>

        <router-link to="/search">Search</router-link>
        <router-link to="/about">About</router-link>
      </nav>

      <div class="actions">
        <div v-if="isLoggedIn">
        <router-link to="/inbox" class="mail-wrapper" aria-label="Open inbox">
          <i class="fas fa-envelope"></i>
          <span v-if="hasUnreadEmails" class="badge">{{ unreadEmailsCount }}</span>
          <span v-else class="no-new">No new</span>
        </router-link>
      </div>
        <template v-if="isLoggedIn">
          <button class="btn small" @click="goToUser">User</button>
          <button class="btn small danger" @click="logout">Logout</button>
        </template>
        <template v-else>
          <button class="btn small" @click="goToUser">Register User</button>
          <button class="btn small success" @click="goToLogin">Login</button>
        </template>
      </div>
    </header>
    <router-view @event-user-logged-in="updateNavMenu"/>
  </div>
</template>
<script>
import SessionStorageService from "@/services/SessionStorageService";
import MyOrdersView from "@/views/MyOrdersView.vue";
import MyServicesView from "@/views/MyServicesView.vue";

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      unreadEmailsCount: 0
    };
  },
  computed: {
    hasUnreadEmails() {
      return Number(this.unreadEmailsCount) > 0;
    }
  },
  methods: {
    updateNavMenu() {
      this.isLoggedIn = !!(SessionStorageService?.isLoggedIn?.() || sessionStorage.getItem("userId"));
      this.isAdmin = !!(SessionStorageService?.isAdmin?.() || sessionStorage.getItem("role") === "ADMIN");
      const badge = Number(sessionStorage.getItem("unreadEmailsCount") || localStorage.getItem("unreadEmailsCount"));
      if (Number.isFinite(badge)) this.unreadEmailsCount = badge;
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
      window.location.href = "my-service";
    },
    logout() {
      sessionStorage.clear();
      localStorage.removeItem("unreadEmailsCount");
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.goToHome();
    }
  },
  mounted() {
    this.updateNavMenu();
    window.addEventListener("storage", this.updateNavMenu);
    window.addEventListener("session-storage", this.updateNavMenu);
    window.addEventListener("local-storage", this.updateNavMenu);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) this.updateNavMenu();
    });
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateNavMenu);
    window.removeEventListener("session-storage", this.updateNavMenu);
    window.removeEventListener("local-storage", this.updateNavMenu);
  },
  watch: {
    $route() {
      this.updateNavMenu();
    }
  }
};
</script>
