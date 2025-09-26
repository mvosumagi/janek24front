<template>
  <br>
  <br>
  <br>

  <div class="home">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <section class="intro">
            <h1><Strong>Trusted Home Services At Your Fingertips</Strong></h1>
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
        <img
            :src="service.thumbnailUrl || '/cleaners.jpg'"
            class="card-img-top"
            alt="Service thumbnail"
        />
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


  <img src="/kuidastöötab2.png" alt="Public Image"/>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  data() {
    return {
      partialDescription: '',
      services: []
    }
  },
  methods: {
    goSearch() {
      const q = this.partialDescription.trim()
      if (!q) return
      this.$router.push({ name: 'searchRoute', query: { q } })
    }
  },
  mounted() {
    axios.get('/services', {
      params: {
        partialDescription: ''
      }
    })
        .then(response => {
          const allServices = response.data;
          const shuffled = allServices
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);

          this.services = shuffled.slice(0, 6);
        })
        .catch(error => {
          console.error('Failed to load services:', error);
        });
  }


}
</script>

<style scoped>
</style>
