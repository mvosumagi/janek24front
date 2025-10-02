<template>
  <div class="container my-4">
    <section class="search mb-4">
      <div class="input-group">
        <input
            type="text"
            class="form-control"
            placeholder="What service do you need?"
            v-model="partialDescription"
            @keyup.enter="submitSearch"
        />
        <button class="btn btn-primary" @click="submitSearch">Find Services</button>
      </div>
    </section>

    <section class="info-section">
      <h2>Services</h2>
    </section>

    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="services.length">
      <div class="col" v-for="service in services" :key="service.serviceId || service.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ service.serviceName }}</h5>
            <p class="card-text">
              <strong>Description:</strong> {{ service.descriptionShort }}
            </p>
            <p class="card-text">
              <strong>Cost:</strong> {{ service.unitCost }} €
            </p>
            <button class="btn btn-success" @click="goToOrder(service.serviceId)">
              Order Service
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-muted">
      <em v-if="loading">Loading…</em>
      <em v-else-if="queryFromUrl">No results for “{{ queryFromUrl }}”.</em>
      <em v-else>Try a search above.</em>
    </div>
  </div>
</template>

<script>
import SearchService from "@/services/SearchService";

export default {
  name: 'SearchView',
  data() {
    return {
      partialDescription: '',
      services: [],
      loading: false
    }
  },
  computed: {
    queryFromUrl() {
      const q = this.$route.query.q
      return (q || '').toString()
    }
  },
  isFormValid() {
    return (
        this.service.serviceCategoryId &&
        this.service.name &&
        this.service.currencyIsId &&
        this.service.unitCost > 0 &&
        this.service.descriptionShort?.trim().length > 0 &&
        this.service.descriptionLong?.trim().length > 0
    );
  },

  isEditing() {
    return !!this.$route.params.id;  // CHANGE THIS
  },

  created() {
    this.partialDescription = this.queryFromUrl
  },
  mounted() {
    if (this.partialDescription.trim()) {
      this.fetchResults(this.partialDescription.trim())
    }
  },
  watch: {
    '$route.query.q'(next) {
      const q = (next || '').toString().trim()
      this.partialDescription = q
      if (q) {
        this.fetchResults(q)
      } else {
        this.services = []
      }
    }
  },
  methods: {
    submitSearch() {
      const q = this.partialDescription.trim()
      if (!q) return
      if (q !== this.$route.query.q) {
        this.$router.push({name: 'searchRoute', query: {q}})
      } else {
        this.fetchResults(q)
      }
    },
    goToOrder(serviceId) {
      this.$router.push({name: 'OrderingView', params: {serviceId}})
    },
    fetchResults(q) {
      this.loading = true
      SearchService.sendSearchRequest(q)
          .then(res => {
            this.services = Array.isArray(res.data) ? res.data : []
          })
          .catch(err => {
            console.error('Search failed:', err)
            this.services = []
          })
          .finally(() => {
            this.loading = false
          })
    },
  },
  async loadService() {
    this.loading = true;
    this.errorMessage = "";

    try {
      const providerServiceId = this.$route.params.id;  // CHANGE THIS
      if (!providerServiceId) throw new Error("Missing service ID");

      const response = await ServiceProviderService.getService(providerServiceId);
      const data = response.data;

      this.service.serviceCategoryId = Number(data.serviceCategoryId || 0);
      this.service.name = data.name || '';
      this.service.unitCost = Number(data.unitCost || 0);
      this.service.currencyIsId = Number(data.currencyIsId || 1);
      this.service.descriptionShort = data.descriptionShort || '';
      this.service.descriptionLong = data.descriptionLong || '';
      this.service.validDays = this.calculateValidDays(data.validFrom, data.validTo);

      if (data.imageBase64) {
        this.service.imageBase64 = data.imageBase64;
        this.imagePreview = `data:image/jpeg;base64,${data.imageBase64}`;
      }

    } catch (e) {
      console.error('Failed to load service:', e);
      this.displayErrorMessage("Service data load failed");
    } finally {
      this.loading = false;
    }
  },



}
</script>

<style scoped>
</style>
