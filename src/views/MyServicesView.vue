<!--<template>-->
<!--  <div class="container text-center">-->
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <h1>My Services</h1>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--  <section>-->
<!--    &lt;!&ndash;    <table id="myServicesTable">&ndash;&gt;-->
<!--    <table class="table table-striped">-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>#</th>-->
<!--        <th>Service</th>-->
<!--        <th>Type</th>-->
<!--        <th>Valid from</th>-->
<!--        <th>Valid to</th>-->
<!--        <th>Unit cost</th>-->
<!--        <th>Review</th>-->
<!--        <th>Picture</th>-->
<!--        <th>Status</th>-->
<!--        <th>Edit</th>-->
<!--        <th>Delete</th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--&lt;!&ndash;      <tbody id="tableBody">&ndash;&gt;-->
<!--&lt;!&ndash;      &lt;!&ndash; Teenused renderdatakse siia &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      </tbody>&ndash;&gt;-->
<!--      <tbody>-->
<!--      <tr v-for="(service, index) in myServices" :key="service.serviceId">-->
<!--        <td>{{ index + 1 }}</td>-->
<!--        <td>{{ service.serviceName }}</td>-->
<!--        <td>{{ service.type }}</td>-->
<!--        <td>{{ service.validFrom }}</td>-->
<!--        <td>{{ service.validTo }}</td>-->
<!--        <td>{{ service.unitCost }} €</td>-->
<!--        <td>{{ service.review || '—' }}</td>-->
<!--        <td>-->
<!--          <img :src="service.pictureUrl" alt="Service Image" class="img-thumbnail" width="80" />-->
<!--        </td>-->
<!--        <td>{{ service.status }}</td>-->
<!--        <td><button class="btn btn-sm btn-warning">Edit</button></td>-->
<!--        <td><button class="btn btn-sm btn-danger">Delete</button></td>-->
<!--      </tr>-->
<!--      </tbody>-->



<!--    </table>-->
<!--    <button @click="goToService" type="submit" class="btn btn-outline-primary">Add a New Service</button>-->
<!--  </section>-->

<!--</template>-->

<!--<style>-->

<!--</style>-->

<!--&lt;!&ndash;<script>&ndash;&gt;-->

<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;  methods: {&ndash;&gt;-->
<!--&lt;!&ndash;    goToService() {&ndash;&gt;-->
<!--&lt;!&ndash;      this.$router.push('/service')&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--<script>-->
<!--import SearchService from "@/services/SearchService"; // or use MyServicesService if available-->
<!--import NavigationService from "@/services/NavigationService";-->

<!--export default {-->
<!--  name: 'MyServicesView',-->
<!--  data() {-->
<!--    return {-->
<!--      myServices: []-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    goToService() {-->
<!--      this.$router.push('/service');-->
<!--    },-->
<!--    getMyServices() {-->
<!--      SearchService.sendSearchRequest('my') // or use a dedicated endpoint like getMyServices()-->
<!--          .then(response => {-->
<!--            this.myServices = response.data;-->
<!--          })-->
<!--          .catch(() => NavigationService.navigateToErrorView());-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getMyServices();-->
<!--  }-->
<!--};-->
<!--</script>-->

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>My Services</h1>
      </div>
    </div>
  </div>

  <section>
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading your services...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <strong>Error:</strong> {{ error }}
      <button @click="getMyServices" class="btn btn-outline-danger btn-sm ms-2">Retry</button>
    </div>

    <!-- Services table -->
    <div v-else-if="myServices.length" class="table-responsive">
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
        <tbody>
        <tr v-for="(service, index) in myServices" :key="service.serviceId || index">
          <td>{{ index + 1 }}</td>
          <td>{{ service.serviceName }}</td>
          <td>{{ service.type }}</td>
          <td>{{ formatDate(service.validFrom) }}</td>
          <td>{{ formatDate(service.validTo) }}</td>
          <td>{{ service.unitCost }} €</td>
          <td>{{ service.review || '—' }}</td>
          <td>
            <img
                v-if="service.pictureUrl"
                :src="service.pictureUrl"
                alt="Service Image"
                class="img-thumbnail"
                width="80"
                @error="handleImageError"
            />
            <span v-else class="text-muted">No image</span>
          </td>
          <td>
              <span
                  :class="getStatusClass(service.status)"
                  class="badge"
              >
                {{ service.status || 'Unknown' }}
              </span>
          </td>
          <td>
            <button
                @click="editService(service)"
                class="btn btn-sm btn-warning"
                :disabled="loading"
            >
              Edit
            </button>
          </td>
          <td>
            <button
                @click="deleteService(service)"
                class="btn btn-sm btn-danger"
                :disabled="loading"
            >
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-5">
      <div class="text-muted">
        <h4>No services found</h4>
        <p>You haven't created any services yet. Start by adding your first service!</p>
      </div>
    </div>

    <!-- Add service button -->
    <div class="text-center mt-4">
      <button @click="goToService" type="button" class="btn btn-outline-primary">
        Add a New Service
      </button>
    </div>
  </section>
</template>

<script>
import SearchService from "@/services/SearchService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'MyServicesView',
  data() {
    return {
      myServices: [],
      loading: false,
      error: null
    };
  },
  methods: {
    goToService() {
      this.$router.push('/service');
    },

    async getMyServices() {
      this.loading = true;
      this.error = null;

      try {
        // Use SearchService with a query parameter for user's services
        const response = await SearchService.sendSearchRequest('my');

        // Handle different response structures
        if (response && response.data) {
          this.myServices = Array.isArray(response.data) ? response.data : [];
        } else {
          this.myServices = [];
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
        this.error = error.response?.data?.message || 'Failed to load services';

        // Optional: Navigate to error view for critical errors
        // NavigationService.navigateToErrorView();
      } finally {
        this.loading = false;
      }
    },

    editService(service) {
      // Navigate to edit page with service ID
      this.$router.push({
        name: 'EditService',
        params: { serviceId: service.serviceId }
      });
    },

    async deleteService(service) {
      if (!confirm(`Are you sure you want to delete "${service.serviceName}"?`)) {
        return;
      }

      this.loading = true;
      try {
        // You'll need to implement deleteService in SearchService or create a dedicated service
        // await SearchService.deleteService(service.serviceId);

        // For now, remove from local array (temporary solution)
        this.myServices = this.myServices.filter(s => s.serviceId !== service.serviceId);

        alert('Service deleted successfully');
      } catch (error) {
        console.error('Failed to delete service:', error);
        this.error = 'Failed to delete service';
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return '—';
      try {
        return new Date(dateString).toLocaleDateString();
      } catch {
        return dateString;
      }
    },

    getStatusClass(status) {
      const statusMap = {
        'active': 'bg-success',
        'inactive': 'bg-secondary',
        'pending': 'bg-warning text-dark',
        'expired': 'bg-danger'
      };
      return statusMap[status?.toLowerCase()] || 'bg-secondary';
    },

    handleImageError(event) {
      // Hide broken images or show placeholder
      event.target.style.display = 'none';
    }
  },

  mounted() {
    this.getMyServices();
  }
};
</script>