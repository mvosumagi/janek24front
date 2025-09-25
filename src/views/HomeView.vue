<template>

  <div class="home">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <section class="intro">
            <h1>Trusted Home Services At Your Fingertips</h1>
            <p>Connect with trusted professionals in your area for home services, repairs, and more. Book with
              confidence, get quality results.</p>
          </section>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-4">
    <h2 class="mb-4 text-center">Search Services</h2>
    <div class="input-group mb-4">
      <input type="text" class="form-control" placeholder="Search by service name or description..."
             v-model="partialDescription"/>
      <button class="btn btn-primary" @click="searchServices"> Search</button>
    </div>
  </div>


  <br>
  <br>

  <div class="row col-md-8 row-cols-1 row-cols-md-3 g-4 mx-auto">
    <div class="col">
      <div class="card" style="width: 18rem;">        <img src="/child%20care.jpg " class="card-img-top" alt="111">
        <div class="card-body">          <h5 class="card-title">Card title</h5>          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
import axios from 'axios'
import SearchService from "@/services/SearchService";

export default {
  data() {
    return {
      partialDescription: '',
      services: []
    }
  },
  mounted() {
    this.fetchAllServices()
  },
  methods: {
    fetchAllServices() {
      axios.get('http://localhost:8080/api/my-service')
          .then(res => {
            this.services = res.data
          })
          .catch(err => console.error(err))
    },
    searchServices() {
      if (!this.partialDescription.trim()) return;
      this.$router.push({
        name: 'searchRoute',
        query: { searchQuery: this.partialDescription }
      });
    }

  }

}
</script>

<style scoped>
</style>
