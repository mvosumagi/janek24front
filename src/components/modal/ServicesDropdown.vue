<template>
  <select @change="$emit('event-new-service-selected', Number($event.target.value))">
    <option v-for="service in services" :key="service.serviceId" :value="service.serviceId">
      {{ service.serviceName }}
    </option>
  </select>
</template>
<script>
export default {
  name: 'ServicesDropdown',
  props: {
    services: Array,
    selectedServiceId: Number

  },
  methods: {

    handleServiceDropdownChange(event) {
      this.$emit('event-new-service-selected', Number(event.target.value))
    },

  }
}
</script>