<script setup>

</script>

<template>

  <section class="search">
    <div class="search-container">
      <input type="text" placeholder="What service do you need?" id="searchInput">
      <button onclick="performSearch()">Find Services</button>
    </div>
  </section>

  <section class="info-section">
    <h2>Popular Services</h2>
    <div class="info-grid">
      <!-- Reusable info boxes -->
      <div class="info-box" onclick="selectService('cleaning')">
        <div class="img">🏠</div>
        <h3>Home Cleaning</h3>
        <p>Professional house cleaning services to keep your home spotless and organized.</p>
      </div>

      <div class="info-box" onclick="selectService('landscaping')">
        <div class="img">🌿</div>
        <h3>Lawn Care</h3>
        <p>Landscaping, lawn maintenance, and garden services to beautify your outdoor space.</p>
      </div>

      <div class="info-box" onclick="selectService('tech')">
        <div class="img">💻</div>
        <h3>Tech Support</h3>
        <p>Computer repair, smartphone help, and technology assistance from certified experts.</p>
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
    </div>
  </section>


</template>

<style scoped>

</style>