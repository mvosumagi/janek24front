<template>
  <select @change="handleServiceDropdownChange">
    <option disabled selected value> -- select a service --</option>
    <option v-for="service in services" :key="service.serviceId" :value="service.serviceId">
      {{ service.serviceName }}
    </option>
  </select>
</template>

<script>
import SearchService from "@/services/SearchService";

export default {
  name: 'ServicesDropdown',
  props: {
    selectedServiceId: Number
  },
  data() {
    return {
      services: []
    };
  },
  methods: {
    handleServiceDropdownChange(event) {
      this.$emit('event-new-service-selected', Number(event.target.value));
    },
    loadServices() {
      SearchService.sendSearchRequest('')
          .then(response => {
            this.services = response.data;
          })
          .catch(error => {
            console.error("Failed to load services:", error);
          });
    }
  },
  mounted() {
    this.loadServices();
  }
};
</script>
