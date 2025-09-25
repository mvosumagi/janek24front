<script>
import axios from 'axios';

export default {
  data() {
    return {
      partialDescription: '',
      services: []
    };
  },
  methods: {
    searchServices() {
      if (!this.partialDescription.trim()) {
        return;
      }

      axios
          .get('/services', {
            params: {
              partialDescription: this.partialDescription.trim()
            },
            headers: {
              Accept: 'application/json'
            }
          })
          .then(response => {
            this.services = response.data;
            console.log('Search results:', this.services);
          })
          .catch(error => {
            console.error('Search failed:', error);
          });
    },

    goToOrder(serviceId) {
      this.$router.push({
        name: 'OrderingView',
        params: { serviceId }
      });
    }
  }
};
</script>



<template>



  <section class="search my-4">
    <div class="input-group">
      <input
          type="text"
          class="form-control"
          placeholder="What service do you need?"
          v-model="partialDescription"
      />
      <button class="btn btn-primary" @click="searchServices">
        Find Services
      </button>
    </div>
  </section>
  <section class="info-section">
    <h2>Services</h2>

  </section>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="service in services" :key="service.id">
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

</template>

<style scoped>

</style>