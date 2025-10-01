<template>
  <div class="home">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <section class="intro">
            <h1><strong>Trusted Home Services At Your Fingertips</strong></h1>
            <p>
              <b>Connect with trusted professionals in your area for home services, repairs, and more.
                Book with confidence, get quality results.</b>
            </p>
          </section>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <div class="input-group mb-4">
        <input
            type="text"
            class="form-control"
            placeholder="Search by service name or description..."
            v-model="partialDescription"
            @keyup.enter="goSearch"
        />
        <button class="btn btn-primary" @click="goSearch">Search</button>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="services && services.length">
      <div class="col" v-for="service in services" :key="service.serviceId">
        <div class="card h-100">
          <img :src="service.imageData" alt="Service Image" class="card-img-top" v-if="service.imageData"/>
          <div class="card-body">
            <h5 class="card-title">{{ service.serviceName }}</h5>
            <p class="card-text">
              <strong>Description:</strong> {{ service.descriptionShort }}
            </p>
            <p class="card-text">
              <strong>Cost:</strong> {{ service.unitCost || 'N/A' }} €
            </p>
            <button class="btn btn-success" @click="goToOrder(service.serviceId)">
              Order Service
            </button>
          </div>
        </div>
      </div>
    </div>

    <img src="../assets/HowItWorks.png" alt="Public Image" class="large-image"/>
  </div>
</template>

<script>
import SearchService from "@/services/SearchService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'HomeView',
  data() {
    return {
      partialDescription: '',
      services: []
    }
  },
  methods: {
    getServices() {
      SearchService.sendSearchRequest(this.partialDescription)
          .then(response => this.handleSearchResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },
    handleSearchResponse(response) {
      const allServices = response.data;
      const shuffled = allServices
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      this.services = shuffled.slice(0, 6);
    },
    goSearch() {
      const q = this.partialDescription.trim();
      if (!q) return;
      this.$router.push({ name: 'searchRoute', query: { q } });
    },
    goToOrder(serviceId) {
      if (!serviceId) {
        console.error('Missing serviceId');
        return;
      }
      this.$router.push({ name: 'OrderingView', params: { serviceId } });
    }
  },
  mounted() {
    this.getServices();
  }
}
</script>

<style scoped>
.btn:hover {
  background-color: #0056b3;
}

.large-image {
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  display: block;
}
</style>
