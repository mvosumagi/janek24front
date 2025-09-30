<template>
  <div class="container text-center">
    <AlertDanger :message="errorMessage"/>
    <AlertSuccess :message="successMessage"/>

    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Add a New Service</h5>

        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Submitting...</span>
          </div>
          <p class="mt-2">Creating your service...</p>
        </div>

        <form @submit.prevent="submitService" v-if="!loading">
          <table class="table">
            <tbody>
            <tr>
              <td><label for="serviceCategory">Service Category</label></td>
              <td>
                <select
                    id="serviceCategory"
                    :value="service.serviceCategoryId"
                    @change="handleServiceCategoryChange"
                    class="form-control"
                    required
                >
                  <option value="">Select a category</option>
                  <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                  >
                    {{ category.description }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="serviceName">Service name</label></td>
              <td>
                <input
                    id="serviceName"
                    type="text"
                    class="form-control"
                    placeholder="Enter service name"
                    :value="service.name"
                    @input="handleServiceNameChange"
                    required
                />
              </td>
            </tr>
            <tr>
              <td><label for="currency">Currency</label></td>
              <td>
                <select
                    id="currency"
                    :value="service.currencyIsId"
                    @change="handleCurrencyChange"
                    class="form-control"
                    required
                >
                  <option value="">Select currency</option>
                  <option
                      v-for="currency in currencies"
                      :key="currency.id"
                      :value="currency.id"
                  >
                    {{ currency.description }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="unitCost">Unit cost</label></td>
              <td>
                <input
                    id="unitCost"
                    type="number"
                    class="form-control"
                    placeholder="20"
                    :value="service.unitCost"
                    @input="handleUnitCostChange"
                    min="0"
                    step="0.01"
                    required
                />
              </td>
            </tr>
            <tr>
              <td><label for="descriptionShort">Short description</label></td>
              <td>
                <input
                    id="descriptionShort"
                    type="text"
                    class="form-control"
                    placeholder="Brief service summary"
                    :value="service.descriptionShort"
                    @input="handleDescriptionShortChange"
                    maxlength="100"
                    required
                />
                <small class="text-muted">{{ service.descriptionShort?.length || 0 }}/100 characters</small>
              </td>
            </tr>
            <tr>
              <td><label for="descriptionLong">Detailed description</label></td>
              <td>
                <textarea
                    id="descriptionLong"
                    class="form-control"
                    placeholder="Friendly dog walking in city center"
                    :value="service.descriptionLong"
                    @input="handleDescriptionLongChange"
                    rows="3"
                    maxlength="500"
                    required
                ></textarea>
                <small class="text-muted">{{ service.descriptionLong?.length || 0 }}/500 characters</small>
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
                <div v-if="imagePreview" class="mt-2">
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
                    :value="service.validDays"
                    @change="handleValidDaysChange"
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
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import ServiceProviderService from "@/services/ServiceProviderService";
import CurrencyService from "@/services/CurrencyService";
import ServiceCategoryService from "@/services/ServiceCategoryService";

export default {
  name: 'AddServiceView',
  components: {
    AlertDanger,
    AlertSuccess
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      successMessage: "",

      userId: sessionStorage.getItem('userId') || "",

      service: {
        serviceCategoryId: 0,
        name: '',
        unitCost: null,
        currencyIsId: 1,
        descriptionShort: '',
        descriptionLong: '',
        validDays: 30,
        photoFile: null
      },

      imagePreview: null,
      currencies: [],
      categories: [],

      errorResponse: {
        message: "",
        errorCode: 0
      }
    }
  },
  computed: {
    isFormValid() {
      return (
          this.service.serviceCategoryId &&
          this.service.name &&
          this.service.currencyIsId &&
          this.service.unitCost > 0 &&
          this.service.descriptionShort?.trim().length > 0 &&
          this.service.descriptionLong?.trim().length > 0
      );
    }
  },
  methods: {
    displayErrorMessage(message) {
      this.errorMessage = message;
      setTimeout(this.resetAllMessages, 4000);
    },

    displaySuccessMessage(message) {
      this.successMessage = message;
      setTimeout(this.resetAllMessages, 3000);
    },

    resetAllMessages() {
      this.errorMessage = "";
      this.successMessage = "";
    },

    handleServiceCategoryChange(event) {
      this.service.serviceCategoryId = Number(event.target.value);
    },

    handleServiceNameChange(event) {
      this.service.name = event.target.value;
    },

    handleCurrencyChange(event) {
      this.service.currencyIsId = Number(event.target.value);
    },

    handleUnitCostChange(event) {
      this.service.unitCost = Number(event.target.value);
    },

    handleDescriptionShortChange(event) {
      this.service.descriptionShort = event.target.value;
    },

    handleDescriptionLongChange(event) {
      this.service.descriptionLong = event.target.value;
    },

    handleValidDaysChange(event) {
      this.service.validDays = Number(event.target.value);
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        this.displayErrorMessage('File size must be less than 5MB');
        event.target.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        this.displayErrorMessage('Please select a valid image file');
        event.target.value = '';
        return;
      }

      this.service.photoFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.resetAllMessages();
    },

    removeImage() {
      this.service.photoFile = null;
      this.imagePreview = null;

      const fileInput = document.getElementById('photo');
      if (fileInput) {
        fileInput.value = '';
      }
    },

    async submitService() {
      if (!this.isFormValid) {
        this.displayErrorMessage('Please fill in all required fields');
        return;
      }

      if (!this.userId) {
        this.displayErrorMessage('User not logged in');
        return;
      }

      this.loading = true;
      this.resetAllMessages();

      try {
        const now = new Date();
        const validTo = new Date(now.getTime() + (this.service.validDays * 24 * 60 * 60 * 1000));

        const serviceData = {
          serviceCategoryId: this.service.serviceCategoryId,
          name: this.service.name,
          descriptionShort: this.service.descriptionShort,
          descriptionLong: this.service.descriptionLong,
          validFrom: now.toISOString().split('T')[0],
          validTo: validTo.toISOString().split('T')[0],
          unitCost: this.service.unitCost,
          currencyIsId: this.service.currencyIsId,
          status: 'A'
        };

        const response = await ServiceProviderService.createService(serviceData, this.userId);

        if (response && response.data) {
          this.displaySuccessMessage('Service created successfully!');
          setTimeout(() => {
            this.$router.push('/my-services');
          }, 1500);
        }
      } catch (error) {
        this.handleSubmitServiceErrorResponse(error);
      } finally {
        this.loading = false;
      }
    },

    handleSubmitServiceErrorResponse(error) {
      this.errorResponse = error.response?.data || {};

      if (error.response?.status === 403 && this.errorResponse.errorCode === 132132) {
        this.errorMessage = this.errorResponse.message;
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to create service. Please try again.';
        this.displayErrorMessage(errorMessage);
      }
      setTimeout(this.resetAllMessages, 4000);
    },

    goBack() {
      this.$router.push('/my-services');
    },

    async loadCurrencies() {
      try {
        const response = await CurrencyService.getCurrencies();
        this.currencies = response.data;
        console.log('Loaded currencies:', this.currencies);
      } catch (error) {
        console.error('Failed to load currencies:', error);
        this.displayErrorMessage('Failed to load currencies');
      }
    },

    async loadServiceCategories() {
      try {
        const response = await ServiceCategoryService.getServiceCategories();
        this.categories = response.data;
        console.log('Loaded service categories:', this.categories);
      } catch (error) {
        console.error('Failed to load service categories:', error);
        this.displayErrorMessage('Failed to load service categories');
      }
    }
  },
  async mounted() {
    await this.loadCurrencies();
    await this.loadServiceCategories();
  }
}
</script>

<style scoped>
.preview-thumb {
  max-width: 200px;
  max-height: 200px;
}
</style>