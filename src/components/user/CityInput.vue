<template>
  <div class="form-floating mb-3">
    <input :value="city" @input="handleCityInput" type="text" class="form-control" placeholder="City"/>
    <label class="col-4 text-start">City</label>
  </div>
 </template>

<script>
export default {
  name: "CityInput",
  props: {
    city: String
  },
  methods: {
    handleCityInput(event) {
      this.$emit("event-city-updated", String(event.target.value))
    }
  }
}
</script>
