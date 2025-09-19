
<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>My Services</h1>
      </div>
    </div>


    <div class="row justify-content-center">
      <div class="col col-3">
        <ServicesDropdown :cities="services" :selected-service-id="selectedServiceId"
                          @event-new-service-selected="handleSelectedServiceChange"
        />
      </div>
      <div class="col col-6">
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>

        />
      </div>

      <div class="mb-3">
        <label class="form-label">Service name</label>
        <input v-model="servicename" type="email" class="form-control">
      </div>

      <div class="mb-3">
        <label class="form-label">Detailed description</label>
        <input v-model="detailedDescription" type="email" class="form-control">
      </div>

      <div class="mb-3">
        <label class="form-label">Unit cost</label>
        <input v-model="unitPrice " type="email" class="form-control">
      </div>


      <button @click=" " type="submit" class="btn btn-outline-primary">Back</button>


    </div>
  </div>
</template>


<style scoped>

</style>


<script>
import ServicesDropdown from "@/components/modal/ServicesDropdown.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'ServiceView',
  components: {AlertSuccess, AlertDanger, ServicesDropdown},
  data() {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      roleName: sessionStorage.getItem('roleName'),
      selectedServiceId: 0,
      errorMessage: '',
      successMessage: '',


      services: [
        {
          serviceId: 0,
          serviceName: ''
        }
      ],


      errorResponse: {
        message: '',
        errorCode: 0
      }

    }
  },
  methods: {

    getServices() {
      ServiceService.sendGetServicesRequest()
          .then(response => this.services = response.data)
          .catch(() => NavigationService.navigateToErrorView())
    },


    resetErrorMessage() {
      this.errorMessage = ''
    },

    resetSuccessMessage() {
      this.successMessage = ''
    },


  },
  mounted() {
    this.getServices()

  }
}
</script>