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
              partialDescription: (this.partialDescription || '').trim()
            },
            headers: {
              Accept: 'application/json'
            }
          })
          .then(response => {
            this.services = response.data
            console.log('Search results:', this.services)
          })
          .catch(error => {
            console.error('Search failed:', error)
          });
    }
  }
};
</script>
<template>
  <section class="info-section">
    <h2>Services</h2>
    <div class="row">
      <div class="col-md-6">
        <div class="card" style="width: 100%;">
          <img src="null" class="card-img-top" alt="null">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
                Some quick example text to build on the card title and make up the bulk of the card’s content.
              </p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
            </ul>
            <div class="card-body">
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>
        </div>
      <div class="col-md-6">
        <div class="card" style="width: 100%;">
          <img src="null" class="card-img-top" alt="null">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card’s content.
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>


  </section>


</template>

<style scoped>

</style>