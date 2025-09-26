<template>
  <div class="home">
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <section class="intro">
            <h1>Trusted Home Services At Your Fingertips</h1>
            <p>
              Connect with trusted professionals in your area for home services, repairs, and more.
              Book with confidence, get quality results.
            </p>
          </section>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <h2 class="mb-4 text-center">Search Services</h2>
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
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      partialDescription: ''
    }
  },
  methods: {
    goSearch() {
      const q = this.partialDescription.trim()
      if (!q) return
      this.$router.push({ name: 'searchRoute', query: { q } })
    }
  }
}
</script>

<style scoped>
</style>
