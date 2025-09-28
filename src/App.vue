<template>
  <div id="app">
    <header class="topbar">
      <nav class="menu">
        <router-link to="/home">Home</router-link>
        <!--        <router-link to="/my-services">My Services</router-link>-->
        <!--        <router-link to="/my-orders">My Orders</router-link>-->
        <router-link to="/search">Search</router-link>
      </nav>
      <div class="actions">
        <div v-if="isLoggedIn">
          <button class="btn small" @click="goToMyServices">My Services</button>
          <button class="btn small" @click="goToMyOrders">My Orders</button>
        </div>
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
    MyServicesView() {
      return MyServicesView
    },
    MyOrdersView() {
      return MyOrdersView
    },
    hasUnreadEmails() {
      return Number(this.unreadEmailsCount) > 0;
    }
  },
  methods: {


    goToMyServices() {
      const userId = sessionStorage.getItem("userId");
      this.$router.push({name: 'myServicesRoute', params: {customerId: userId}});
    },
    goToMyOrders() {
      const userId = sessionStorage.getItem("userId");
      this.$router.push({name: 'myOrdersRoute', params: {customerId: userId}});
    },
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
    goToOrder() {
      window.location.href = "my-orders";
    },
    goAddNewService() {
      window.location.href = "service";
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

<style>
:root {
  --gap: 12px;
}

body {
  background-color: #f7f7f7;
  color: #333;
  font-family: Arial, sans-serif;
  margin: 0;
}

.topbar {
  display: flex;
  align-items: center;
  gap: var(--gap);
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #eaeaea;
}

.menu {
  display: flex;
  align-items: center;
}

.menu a {
  text-decoration: none;
  color: #333;
  padding: 6px 8px;
  position: relative;
}

.menu a + a {
  margin-left: 12px;
}

.menu a + a::before {
  content: "|";
  position: absolute;
  left: -10px;
  color: #999;
}

.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--gap);
}

.btn {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background: #6c757d;
}

.btn.small {
  padding: 6px 12px;
  font-size: 14px;
}

.btn.success {
  background: #28a745;
}

.btn.danger {
  background: #dc3545;
}

.mail-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #333;
  text-decoration: none;
}

.mail-wrapper i {
  font-size: 22px;
}

.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: red;
  color: #fff;
  border-radius: 999px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 11px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
}

.no-new {
  font-size: 12px;
  color: #888;
}
</style>
