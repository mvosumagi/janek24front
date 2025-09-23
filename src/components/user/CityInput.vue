<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label class="col-4 text-start">City </label>
          <input :value="city" @input="handleCityInput" type="text" placeholder="City"/>
        </div>
      </div>
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
