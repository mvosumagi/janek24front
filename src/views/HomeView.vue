<template>
  <div class="home">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <br>
          <br>
          <br>
          <br>
          <br>
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
      <h2 class="mb-4 text-center"></h2>
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
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4" v-if="services && services.length">
    <div class="col" v-for="service in services" :key="service.serviceId || service.id">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ service.serviceName }}</h5>
          <p class="card-text">
            <strong>Description:</strong> {{ service.descriptionShort }}
          </p>
          <p class="card-text">
            <strong>Cost: {{ service.unitCost }} € </strong>
          </p>
          <button class="btn btn-success" @click="goToOrder(service.serviceId)">
            Order Service
          </button>
        </div>
      </div>
    </div>
  </div>
  <img src="../assets/HowItWorks.png" alt="Public Image" class="large-image"/>
</template>
<script>
import SearchService from "@/services/SearchService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'HomeView',
  data() {
    return {
      partialDescription: '',
      services: [
        {
          serviceId: 0,
          serviceName: "",
          unitCost: 0,
          descriptionShort: ""
        }
      ]
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
          .map(value => ({value, sort: Math.random()}))
          .sort((a, b) => a.sort - b.sort)
          .map(({value}) => value);
      this.services = shuffled.slice(0, 6);
    },
    goSearch() {
      const q = this.partialDescription.trim()
      if (!q) return
      this.$router.push({name: 'searchRoute', query: {q}})
    },
    goToOrder(serviceId) {
      this.$router.push({name: 'OrderingView', params: {serviceId}});
    }
  },
  mounted() {
    this.getServices()
  }
}
</script>
<script setup lang="ts">
</script>