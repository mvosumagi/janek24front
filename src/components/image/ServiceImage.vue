<template>
  <select :value="selectedCityId" @change="handleCityDropdownChange" class="form-select">
    <option selected :value="0">Kõik linnad</option>
    <option v-for="city in cities" :key="city.cityId" :value="city.cityId">{{ city.cityName }}</option>
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