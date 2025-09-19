<template>
  <select :value="selectedServiceId" @change="handleServiceDropdownChange" class="form-select">
    <option selected :value="0">All services</option>
    <option v-for="service in services " :key="service.serviceId" :value="service.serviceId">{{
        service.serviceName
      }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'ServicesDropdown',
  props: {
    cities: Array,
    selectedServiceId: {
      type: Number,
      default: 0
    }
  },
  methods: {

    handleServiceDropdownChange(event) {
      this.$emit('event-new-service-selected', Number(event.target.value))
    },

  }
}
</script>