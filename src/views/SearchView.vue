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


    <!-- Kaart2 -->
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

    <div class="info-box" onclick="selectService('handyman')">
        <div class="img">🔧</div>
        <h3>Handyman</h3>
        <p>General repairs, installations, and home improvements by skilled professionals.</p>
      </div>

      <div class="info-box" onclick="selectService('petcare')">
        <div class="img">🐕</div>
        <h3>Pet Care</h3>
        <p>Pet sitting, dog walking, grooming, and veterinary transport services.</p>
      </div>

      <div class="info-box" onclick="selectService('tutoring')">
        <div class="img">📚</div>
        <h3>Tutoring</h3>
        <p>Academic support and educational tutoring for students of all ages and subjects.</p>
      </div>
  </section>


</template>

<style scoped>

</style>