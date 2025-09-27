<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Add a New Service</h1>
      </div>
    </div>


    <div class="search-container">

      <div class="row justify-content-center">
        <div class="col col-3">
          <label class="form-label">Provider Service Category</label>
          <ServicesDropdown :services="services" :selected-service-id="selectedServiceId"
                            @event-new-service-selected="handleSelectedServiceChange"
          />
        </div>

      </div>

      <div class="mb-3">
        <label class="form-label">Service name</label>

        <div class="container text-center">
          <div class="row align-items-start">
            <div class="col">
              One of three columns
            </div>
            <div class="col">
              One of three columns
            </div>

          </div>
        </div>




      </div>

      <div class="mb-3">
        <label class="form-label">Detailed description</label>
        <input type="email" class="form-control"
               placeholder="placeholder">
      </div>

      <div class="mb-3">
        <label class="form-label">Unit cost</label>
        <input type="email" class="form-control"
               placeholder="placeholder">
      </div>

      <div class="mb-3">
        <img src="" class="img-thumbnail" alt="placeholder">
      </div>

      <button onclick="">Add a New Service</button>


    </div>
  </div>
</template>

<style scoped>

</style>

<script>

import ServicesDropdown from "@/components/provider_service/ServicesDropdown.vue";
export default {
  name: 'ServiceView',
  components: {ServicesDropdown},
  data() {
    return {
      serviceId: Number(sessionStorage.getItem('serviceId')),
      serviceName: sessionStorage.getItem('serviceName'),
      selectedServiceId: 0,

      services: [

        // {serviceId: 1, serviceName: 'Childcare'},
        // {serviceId: 2, serviceName: 'Lawn care'},
        // {serviceId: 3, serviceName: 'Pet walking'}
        // {
        //   serviceId: 0,
        //   serviceName: ''
        // }
      ],

    }

  },
  methods: {


    handleSelectedServiceChange(selectedServiceId) {
      this.selectedServiceId = selectedServiceId
      const selected = this.services.find(s => s.serviceId === selectedServiceId)
      if (selected) {
        this.serviceName = selected.serviceName
      }
    }

  }
}
</script>