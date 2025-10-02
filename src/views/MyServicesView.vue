<template>
  <div>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <h1>My Services</h1>
        </div>
      </div>
    </div>

    <section>
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      <div v-if="loading" class="alert alert-info" role="status">Loading…</div>

      <table v-if="!loading" id="myServicesTable" class="table table-striped">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Short description</th>
          <th>Valid from</th>
          <th>Valid to</th>
          <th>Unit cost</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(service, index) in myServices" :key="service.id || index">
          <td>{{ index + 1 }}</td>
          <td>{{ service.name }}</td>
          <td>{{ service.descriptionShort }}</td>
          <td>{{ formatDate(service.validFrom) }}</td>
          <td>{{ formatDate(service.validTo) }}</td>
          <td>{{ formatMoney(service.unitCost) }} {{ currencySymbol(service.currencyIsId) }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button class="btn btn-sm btn-warning" @click="editService(service)">Edit</button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click="deleteService(service)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>

      <button @click="goToService" type="button" class="btn btn-outline-primary">Add a New Service</button>
    </section>
  </div>
</template>

<script>
import ServiceProviderService from '@/services/ProviderServiceService';
import SessionStorageService from '@/services/SessionStorageService';

export default {
  name: 'MyServicesView',
  emits: ['eventUserLoggedIn'],
  data() {
    return {
      myServices: [],
      loading: false,
      error: null,
      isLoggedIn: false,
    };
  },
  methods: {
    goToService() {
      this.$router.push('/service');
    },
    editService(service) {
      this.$router.push({
        path: '/service',
        query: { id: service.id }
      });
    },
    deleteService(service) {
      const index = this.myServices.findIndex(s => s.id === service.id);
      if (index !== -1) this.myServices.splice(index, 1);
    },

    formatDate(val) {
      if (!val) return '—';
      const d = new Date(val);
      return isNaN(d) ? val : d.toLocaleDateString();
    },
    formatMoney(val) {
      if (val === null || val === undefined) return '—';
      const num = Number(val);
      return isNaN(num) ? val : num.toFixed(2);
    },
    currencySymbol(id) {
      if (id === 1 || id === '1') return '€';
      if (id === 2 || id === '2') return '$';
      if (id === 3 || id === '3') return '£';
      return '';
    },
    getSessionUserId() {
      const fromStorage = sessionStorage.getItem('userId');
      return fromStorage || null;
    },
    updateAuth() {
      this.isLoggedIn = !!(SessionStorageService?.isLoggedIn?.() || sessionStorage.getItem('userId'));
      if (this.isLoggedIn) this.$emit('eventUserLoggedIn');
    },
    async getUserServices() {
      this.loading = true;
      this.error = null;
      try {
        const userId = this.getSessionUserId();
        if (!userId) throw new Error('Missing userId in session');
        const { data } = await ServiceProviderService.getUserServices(userId);
        this.myServices = Array.isArray(data) ? data : [];
      } catch (e) {
        this.error = e?.response?.data || e.message || 'Failed to load services';
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.updateAuth();
    if (this.isLoggedIn) this.getUserServices();

    window.addEventListener('storage', this.updateAuth);
    window.addEventListener('session-storage', this.updateAuth);
    window.addEventListener('local-storage', this.updateAuth);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.updateAuth();
        if (this.isLoggedIn && !this.myServices.length) this.getUserServices();
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateAuth);
    window.removeEventListener('session-storage', this.updateAuth);
    window.removeEventListener('local-storage', this.updateAuth);
  },
  watch: {
    $route() {
      this.updateAuth();
      if (this.isLoggedIn) this.getUserServices();
    }
  }
};
</script>

<style scoped>
#myServicesTable { margin-top: 1rem; }
</style>
