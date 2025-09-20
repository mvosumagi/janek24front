<template>
  <div class="row mb-3 align-items-center">
    <label class="col-4 text-start">City</label>
    <div class="col-8">
      <input :value="city" @input="handleCityInput" type="text" class="form-control"/>
    </div>
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
