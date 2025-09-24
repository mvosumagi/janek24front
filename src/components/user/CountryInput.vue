<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Country </label>
          <input :value="country" @input="handleCountryInput" type="text" placeholder="Country"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryInput",
  props: {
    country: String
  },
  methods: {

    handleCountryInput(event) {
      this.$emit("event-country-updated", String(event.target.value))
    }
  }


}
</script>
