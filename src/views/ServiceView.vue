<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>Add a New Service</h1>
      </div>
    </div>


    <div class="search-container">

      <div class="row justify-content-center">

<!--        <div class="col col-3">-->
<!--          <label class="form-label">Provider Service Category</label>-->
<!--          <ServicesDropdown :services="services" :selected-service-id="selectedServiceId"-->
<!--                            @event-new-service-selected="handleSelectedServiceChange"-->
<!--          />-->
<!--        </div>-->

      </div>

      <div class="mb-3">
<!--        <label class="form-label">Service name</label>-->

<!--        <div class="container text-center">-->
<!--          <div class="row align-items-start">-->
<!--            <div class="col-3">-->
<!--              One of three columns-->
<!--            </div>-->
<!--            <div class="col-3">-->
<!--              One of three columns-->
<!--            </div>-->

<!--          </div>-->
<!--        </div>-->

        <table class="table">

          <tbody>
          <tr>

            <td>Provider Service Category</td>
            <td>--tuleb andmebaasist--</td>
          </tr>
          <tr>

            <td>Service name</td>
            <td><ServicesDropdown :services="services" :selected-service-id="selectedServiceId"
                                  @event-new-service-selected="handleSelectedServiceChange"
            /></td>
          </tr>
          <tr>

            <td>€ Unit cost</td>
            <td> <input type="number" class="form-control"
                        placeholder="20"></td>
          </tr>
          <tr>

            <td>Detailed description</td>
            <td><input type="text" class="form-control"
                       placeholder="Friendly dog walking in city center"></td>
          </tr>
          <tr>

            <td>Add a Photo</td>
            <td><form action="/action_page.php">
              <label for="files">Select files:</label>
              <input type="file" id="files" name="files" multiple><br><br>
            </form></td>
          </tr>
          <tr>

            <td>Your new service is active for 30 days.</td>
            <td>30</td>
          </tr>
          </tbody>
        </table>




      </div>

      <div class="mb-3">
<!--        <label class="form-label">Detailed description</label>-->
<!--        <input type="email" class="form-control"-->
<!--               placeholder="placeholder">-->
      </div>

      <div class="mb-3">
<!--        <label class="form-label">Unit cost</label>-->
<!--        <input type="email" class="form-control"-->
<!--               placeholder="placeholder">-->
      </div>

      <div class="mb-3">
<!--        <img src="" class="img-thumbnail" alt="placeholder">-->





      </div>

      <button onclick="">Submit</button>


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