<template>
  <div class="container text-center">
    <AlertDanger :message="errorMessage"/>
    <AlertSuccess :message="successMessage"/>

    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">
          <template v-if="isEditing">Edit Service</template>
          <template v-else>Add Service</template>
        </h5>

        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border" role="status"></div>
          <p class="mt-2">
            <template v-if="isEditing">Loading service data...</template>
            <template v-else>Creating your service...</template>
          </p>
        </div>

        <form @submit.prevent="submitService" v-if="!loading">
          <table class="table">
            <tbody>
            <tr>
              <td><label for="serviceCategory">Service Category</label></td>
              <td>
                <select id="serviceCategory" :value="service.serviceCategoryId" @change="handleServiceCategoryChange"
                        class="form-control" required>
                  <option value="">Select a category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.description }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="serviceName">Service name</label></td>
              <td>
                <input id="serviceName" type="text" class="form-control" placeholder="Enter service name"
                       :value="service.name" @input="handleServiceNameChange" required/>
              </td>
            </tr>
            <tr>
              <td><label for="currency">Currency</label></td>
              <td>
                <select id="currency" :value="service.currencyIsId" @change="handleCurrencyChange" class="form-control"
                        required>
                  <option value="">Select currency</option>
                  <option v-for="currency in currencies" :key="currency.id" :value="currency.id">
                    {{ currency.description }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="unitCost">Unit cost</label></td>
              <td>
                <input id="unitCost" type="number" class="form-control" placeholder="20" :value="service.unitCost"
                       @input="handleUnitCostChange" min="0" step="5" required/>
              </td>
            </tr>
            <tr>
              <td><label for="descriptionShort">Short description</label></td>
              <td>
                <input id="descriptionShort" type="text" class="form-control" placeholder="Brief service summary"
                       :value="service.descriptionShort"
                       @input="handleDescriptionShortChange" maxlength="100" required/>
                <small class="text-muted">{{ service.descriptionShort?.length || 0 }}/100 characters</small>
              </td>
            </tr>
            <tr>
              <td><label for="descriptionLong">Detailed description</label></td>
              <td>
                <textarea id="descriptionLong" class="form-control" placeholder="Friendly dog walking in city center"
                          :value="service.descriptionLong" @input="handleDescriptionLongChange" rows="3" maxlength="500"
                          required></textarea>
                <small class="text-muted">{{ service.descriptionLong?.length || 0 }}/500 characters</small>
              </td>
            </tr>
            <tr>
              <td><label for="photo">Add a Photo (Optional)</label></td>
              <td>
                <input ref="fileInput" type="file" id="photo" class="form-control" @change="handleFileUpload"
                       accept="image/*"/>
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
                <select id="validDays" :value="service.validDays" @change="handleValidDaysChange" class="form-control">
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
            <button type="submit" class="btn btn-primary me-2" :disabled="loading || !isFormValid">
              <template v-if="isEditing">Update Service</template>
              <template v-else>Submit Service</template>
            </button>
            <button type="button" class="btn btn-outline-secondary" @click="goBack" :disabled="loading"> Cancel</button>
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
        imageBase64: null
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
    },

    isEditing() {
      return !!this.$route.params.id;
    },

    serviceId() {
      return this.$route.params.id;
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

      this.convertImageToBase64(file);
      this.resetAllMessages();
    },

    convertImageToBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        let base64String = reader.result;
        if (base64String.includes(',')) {
          base64String = base64String.split(',')[1];
        }
        this.service.imageBase64 = base64String;
        this.imagePreview = reader.result;
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.displayErrorMessage('Failed to read image file');
      };
      reader.readAsDataURL(fileObject);
    },

    removeImage() {
      this.service.imageBase64 = null;
      this.imagePreview = null;

      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },

    async loadService() {
      this.loading = true;
      this.errorMessage = "";

      try {
        const serviceId = this.$route.params.id;
        if (!serviceId) throw new Error("Missing service ID");

        const data = await ServiceProviderService.getService(serviceId, this.userId);

        this.service.serviceCategoryId = Number(data.serviceCategoryId || 0);
        this.service.name = data.name || '';
        this.service.unitCost = Number(data.unitCost || 0);
        this.service.currencyIsId = Number(data.currencyIsId || 1);
        this.service.descriptionShort = data.descriptionShort || '';
        this.service.descriptionLong = data.descriptionLong || '';
        this.service.validDays = this.calculateValidDays(data.validFrom, data.validTo);

        if (data.imageBase64) {
          this.service.imageBase64 = data.imageBase64;
          this.imagePreview = `data:image/jpeg;base64,${data.imageBase64}`;
        }

      } catch (e) {
        console.error('Failed to load service:', e);
        this.displayErrorMessage("Service data load failed");
      } finally {
        this.loading = false;
      }
    },

    calculateValidDays(validFrom, validTo) {
      if (!validFrom || !validTo) return 30;

      const from = new Date(validFrom);
      const to = new Date(validTo);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Return closest option
      const options = [30, 60, 90, 365];
      return options.reduce((prev, curr) =>
          Math.abs(curr - diffDays) < Math.abs(prev - diffDays) ? curr : prev
      );
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
          status: 'A',
          imageBase64: this.service.imageBase64
        };

        let response;
        if (this.isEditing) {
          // Update existing service
          response = await ServiceProviderService.updateService(this.serviceId, serviceData, this.userId);
          this.displaySuccessMessage('Service updated successfully!');
        } else {
          // Create new service
          response = await ServiceProviderService.createService(serviceData, this.userId);
          this.displaySuccessMessage('Service created successfully!');
        }

        if (response && response.data) {
          setTimeout(() => {
            this.$router.push('/my-services');
          }, 4000);
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
        const errorMessage = error.response?.data?.message || 'Failed to save service. Please try again.';
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

    if (this.isEditing) {
      await this.loadService();
    }
  }
}
</script>