<!--<template>-->
<!--  <div class="container text-center">-->
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <h1>Add a New Service</h1>-->
<!--      </div>-->
<!--    </div>-->
<!--    <table class="table">-->
<!--      <tbody>-->
<!--      <tr>-->
<!--        <td>Provider Service Category</td>-->
<!--        <td>&#45;&#45;tuleb andmebaasist&#45;&#45;</td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Service name</td>-->
<!--        <td>-->
<!--          <ServicesDropdown :services="services" :selected-service-id="selectedServiceId"-->
<!--                            @event-new-service-selected="handleSelectedServiceChange"-->
<!--          />-->
<!--        </td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>€ Unit cost</td>-->
<!--        <td><input type="number" class="form-control"-->
<!--                   placeholder="20"></td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Detailed description</td>-->
<!--        <td><input type="text" class="form-control"-->
<!--                   placeholder="Friendly dog walking in city center"></td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Add a Photo</td>-->
<!--        <td>-->
<!--          <form action="/action_page.php">-->
<!--            <label for="files">Select files:</label>-->
<!--            <input type="file" id="files" name="files" multiple><br><br>-->
<!--          </form>-->
<!--        </td>-->
<!--      </tr>-->
<!--      <tr>-->
<!--        <td>Your new service is active for 30 days.</td>-->
<!--        <td>30</td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--    <button onclick="">Submit</button>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->

<!--<script>-->
<!--import ServicesDropdown from "@/components/provider_service/ServicesDropdown.vue";-->

<!--export default {-->
<!--  name: 'ServiceView',-->
<!--  components: {ServicesDropdown},-->
<!--  data() {-->
<!--    return {-->
<!--      serviceId: Number(sessionStorage.getItem('serviceId')),-->
<!--      serviceName: sessionStorage.getItem('serviceName'),-->
<!--      selectedServiceId: 0,-->

<!--      services: [-->
<!--        // {serviceId: 1, serviceName: 'Childcare'},-->
<!--        // {serviceId: 2, serviceName: 'Lawn care'},-->
<!--        // {serviceId: 3, serviceName: 'Pet walking'}-->
<!--        // {-->
<!--        //   serviceId: 0,-->
<!--        //   serviceName: ''-->
<!--        // }-->
<!--      ],-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleSelectedServiceChange(selectedServiceId) {-->
<!--      this.selectedServiceId = selectedServiceId-->
<!--      const selected = this.services.find(s => s.serviceId === selectedServiceId)-->
<!--      if (selected) {-->
<!--        this.serviceName = selected.serviceName-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<template>
  <div class="container text-center">
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Add a New Service</h5>
        <!--    <div class="row">-->
        <!--      <div class="col">-->
        <!--        <h1>Add a New Service</h1>-->
        <!--      </div>-->
        <!--    </div>-->
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Submitting...</span>
          </div>
          <p class="mt-2">Creating your service...</p>
        </div>
        <!-- Error state -->
        <div v-if="error" class="alert alert-danger" role="alert">
          <strong>Error:</strong> {{ error }}
        </div>
        <!-- Success state -->
        <div v-if="success" class="alert alert-success" role="alert">
          <strong>Success!</strong> Service created successfully!
        </div>
        <!-- Form -->
        <form @submit.prevent="submitService" v-if="!loading">
          <table class="table">
            <tbody>
            <tr>
              <td><label for="category">Provider Service Category</label></td>
              <td>
                <select
                    id="category"
                    v-model="formData.category"
                    class="form-control"
                    required
                >
                  <option value="">Select Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.name">
                    {{ category.name }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="serviceName">Service name</label></td>
              <td>
                <ServicesDropdown
                    :services="services"
                    :selected-service-id="selectedServiceId"
                    @event-new-service-selected="handleSelectedServiceChange"
                />
              </td>
            </tr>
            <tr>
              <td><label for="unitCost">€ Unit cost</label></td>
              <td>
                <input
                    id="unitCost"
                    type="number"
                    class="form-control"
                    placeholder="20"
                    v-model.number="formData.unitCost"
                    min="0"
                    step="0.01"
                    required
                />
              </td>
            </tr>
            <tr>
              <td><label for="description">Detailed description</label></td>
              <td>
              <textarea
                  id="description"
                  class="form-control"
                  placeholder="Friendly dog walking in city center"
                  v-model="formData.description"
                  rows="3"
                  maxlength="500"
                  required
              ></textarea>
                <small class="text-muted">{{ formData.description.length }}/500 characters</small>
              </td>
            </tr>
            <tr>
              <td><label for="photo">Add a Photo</label></td>
              <td>
                <input
                    type="file"
                    id="photo"
                    class="form-control"
                    @change="handleFileUpload"
                    accept="image/*"
                />
                <small class="text-muted">Supported formats: JPG, PNG, GIF (max 5MB)</small>
                <!-- Preview uploaded image -->
                <div v-if="imagePreview" class="mt-2">
                  <!--              <img :src="imagePreview" alt="Preview" class="img-thumbnail" width="100">-->
                  <img :src="imagePreview" alt="Preview" class="img-thumbnail preview-thumb">
                  <button type="button" @click="removeImage" class="btn btn-sm btn-outline-danger ms-2">
                    Remove
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td><label for="validDays">Service active period</label></td>
              <td>
                <select
                    id="validDays"
                    v-model.number="formData.validDays"
                    class="form-control"
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                </select>
              </td>
            </tr>
            </tbody>
          </table>
          <!-- Form buttons -->
          <div class="text-center mt-4">
            <button
                type="submit"
                class="btn btn-primary me-2"
                :disabled="loading || !isFormValid"
            >
              {{ loading ? 'Creating...' : 'Submit Service' }}
            </button>
            <button
                type="button"
                class="btn btn-outline-secondary"
                @click="goBack"
                :disabled="loading"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import ServicesDropdown from "@/components/provider_service/ServicesDropdown.vue";
// Import your service for API calls
// import ServiceProviderService from "@/services/ServiceProviderService"; // You'll need to create this
export default {
  name: 'ServiceView',
  components: {ServicesDropdown},
  data() {
    return {
      loading: false,
      error: null,
      success: false,
      // Service selection
      serviceId: Number(sessionStorage.getItem('serviceId')),
      serviceName: sessionStorage.getItem('serviceName'),
      selectedServiceId: 0,
      // Form data
      formData: {
        category: '',
        serviceName: '',
        unitCost: null,
        description: '',
        validDays: 30,
        photoFile: null
      },
      // Image preview
      imagePreview: null,
      // Dropdown options
      services: [
        // Will be loaded from API or props
      ],
      categories: [
        {id: 1, name: 'Childcare'},
        {id: 2, name: 'Pet Care'},
        {id: 3, name: 'Home & Garden'},
        {id: 4, name: 'Tutoring'},
        {id: 5, name: 'Cleaning'},
        {id: 6, name: 'Transportation'},
        {id: 7, name: 'Other'}
      ]
    }
  },
  computed: {
    isFormValid() {
      return (
          this.formData.category &&
          this.formData.serviceName &&
          this.formData.unitCost > 0 &&
          this.formData.description.trim().length > 0
      );
    }
  },
  methods: {
    handleSelectedServiceChange(selectedServiceId) {
      this.selectedServiceId = selectedServiceId;
      const selected = this.services.find(s => s.serviceId === selectedServiceId);
      if (selected) {
        this.serviceName = selected.serviceName;
        this.formData.serviceName = selected.serviceName;
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          this.error = 'File size must be less than 5MB';
          event.target.value = '';
          return;
        }
        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.error = 'Please select a valid image file';
          event.target.value = '';
          return;
        }
        this.formData.photoFile = file;
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
        this.error = null;
      }
    },
    removeImage() {
      this.formData.photoFile = null;
      this.imagePreview = null;
      // Clear file input
      const fileInput = document.getElementById('photo');
      if (fileInput) {
        fileInput.value = '';
      }
    },
    async submitService() {
      if (!this.isFormValid) {
        this.error = 'Please fill in all required fields';
        return;
      }
      this.loading = true;
      this.error = null;
      this.success = false;
      try {
        // Create FormData for file upload
        const formData = new FormData();
        // Add all form fields
        formData.append('category', this.formData.category);
        formData.append('serviceName', this.formData.serviceName);
        formData.append('unitCost', this.formData.unitCost);
        formData.append('description', this.formData.description);
        formData.append('validDays', this.formData.validDays);
        // Calculate valid dates
        const now = new Date();
        const validTo = new Date(now.getTime() + (this.formData.validDays * 24 * 60 * 60 * 1000));
        formData.append('validFrom', now.toISOString());
        formData.append('validTo', validTo.toISOString());
        // Add photo if selected
        if (this.formData.photoFile) {
          formData.append('photo', this.formData.photoFile);
        }
        // Send to API
        const response = await ServiceProviderService.createService(formData);
        if (response && response.data) {
          this.success = true;
          // Clear form after successful submission
          setTimeout(() => {
            this.goToMyServices();
          }, 2000);
        }
      } catch (error) {
        console.error('Failed to create service:', error);
        this.error = error.response?.data?.message || 'Failed to create service. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.push('/my-services');
    },
    goToMyServices() {
      this.$router.push('/my-services');
    },
    // Load services for dropdown (if needed)
    async loadServices() {
      try {
        // const response = await ServiceProviderService.getAvailableServices();
        // this.services = response.data;
      } catch (error) {
        console.error('Failed to load services:', error);
      }
    }
  },
  mounted() {
    // Load services if needed
    // this.loadServices();
    // Set initial service name if available
    if (this.serviceName) {
      this.formData.serviceName = this.serviceName;
    }
  }
}
</script>
