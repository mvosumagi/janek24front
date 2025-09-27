<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>My Services</h1>
      </div>
    </div>
  </div>

  <section>
    <!--    <table id="myServicesTable">-->
    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Service</th>
        <th>Type</th>
        <th>Valid from</th>
        <th>Valid to</th>
        <th>Unit cost</th>
        <th>Review</th>
        <th>Picture</th>
        <th>Status</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      </thead>
<!--      <tbody id="tableBody">-->
<!--      &lt;!&ndash; Teenused renderdatakse siia &ndash;&gt;-->
<!--      </tbody>-->
      <tbody>
      <tr v-for="(service, index) in myServices" :key="service.serviceId">
        <td>{{ index + 1 }}</td>
        <td>{{ service.serviceName }}</td>
        <td>{{ service.type }}</td>
        <td>{{ service.validFrom }}</td>
        <td>{{ service.validTo }}</td>
        <td>{{ service.unitCost }} €</td>
        <td>{{ service.review || '—' }}</td>
        <td>
          <img :src="service.pictureUrl" alt="Service Image" class="img-thumbnail" width="80" />
        </td>
        <td>{{ service.status }}</td>
        <td><button class="btn btn-sm btn-warning">Edit</button></td>
        <td><button class="btn btn-sm btn-danger">Delete</button></td>
      </tr>
      </tbody>



    </table>
    <button @click="goToService" type="submit" class="btn btn-outline-primary">Add a New Service</button>
  </section>

</template>

<style>

</style>

<!--<script>-->

<!--export default {-->
<!--  methods: {-->
<!--    goToService() {-->
<!--      this.$router.push('/service')-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<script>
import SearchService from "@/services/SearchService"; // or use MyServicesService if available
import NavigationService from "@/services/NavigationService";

export default {
  name: 'MyServicesView',
  data() {
    return {
      myServices: []
    };
  },
  methods: {
    goToService() {
      this.$router.push('/service');
    },
    getMyServices() {
      SearchService.sendSearchRequest('my') // or use a dedicated endpoint like getMyServices()
          .then(response => {
            this.myServices = response.data;
          })
          .catch(() => NavigationService.navigateToErrorView());
    }
  },
  mounted() {
    this.getMyServices();
  }
};
</script>
