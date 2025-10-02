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
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import InboxService from "@/services/InboxService"
import SessionStorageService from "@/services/SessionStorageService"

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      unreadEmailsCount: 0,
      pollId: null
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
      if (this.isLoggedIn) this.refreshUnreadCount();
    },
    async refreshUnreadCount() {
      const uid = parseInt(sessionStorage.getItem('userId'))
      if (!uid) return
      try {
        const count = await InboxService.unreadCount(uid)
        this.unreadEmailsCount = Number(count) || 0
        sessionStorage.setItem('unreadEmailsCount', String(this.unreadEmailsCount))
      } catch (_) {
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToHome() {
      this.$router.push('/home');
    },
    goToUser() {
      this.$router.push('/user');
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
    this.pollId = setInterval(this.refreshUnreadCount, 30000);
    window.addEventListener("storage", this.updateNavMenu);
    window.addEventListener("session-storage", this.updateNavMenu);
    window.addEventListener("local-storage", this.updateNavMenu);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) this.updateNavMenu();
    });
  },
  beforeUnmount() {
    if (this.pollId) clearInterval(this.pollId);
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
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f7f7f9;
  border-bottom: 1px solid #e5e5ea
}

.menu {
  display: flex;
  gap: 1rem;
  align-items: center
}

.actions {
  display: flex;
  gap: 0.75rem;
  align-items: center
}

.mail-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none
}

.badge {
  display: inline-block;
  min-width: 1.25rem;
  padding: 0 .35rem;
  border-radius: 999px;
  font-size: .75rem;
  line-height: 1.25rem;
  text-align: center;
  background: #dc3545;
  color: #fff
}

.no-new {
  font-size: .75rem;
  color: #888
}

.btn.small {
  font-size: .85rem;
  padding: .25rem .5rem
}

.btn.small.danger {
  background: #dc3545;
  color: #fff
}

.btn.small.success {
  background: #28a745;
  color: #fff
}

main {
  padding: 1rem
}
</style>
