<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Add a New Service</h1>
      </div>
    </div>

    <section class="search">
      <div class="search-container">

        <!-- Replace button with dropdown -->
        <ServicesDropdown />


      </div>
    </section>

    <div class="mb-3">
      <label class="form-label">Service name</label>
      <input type="email" class="form-control">
    </div>

    <div class="mb-3">
      <label class="form-label">Detailed description</label>
      <input type="email" class="form-control">
    </div>

    <div class="mb-3">
      <label class="form-label">Unit cost</label>
      <input type="email" class="form-control">
    </div>

    <div class="mb-3">
      <img src="" class="img-thumbnail" alt="placeholder">
    </div>

<!--    <input type="text" placeholder="What service do you need?" id="searchInput">&ndash;&gt;-->
    <button onclick="">Add New Service</button>



  </div>

</template>


<style scoped>

</style>


<script>

import {defineComponent} from "vue";
import ServicesDropdown from "@/components/modal/ServicesDropdown.vue";

export default defineComponent({
  components: {ServicesDropdown}
})
</script>