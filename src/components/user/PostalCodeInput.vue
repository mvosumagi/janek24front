<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Postal Code</label>
          <input :value="postalCode" @input="handlePostalCodeInput" type="text"  placeholder="76915"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostalCodeInput",
  props: {
    postalCode: String
  },
  methods: {
    handlePostalCodeInput(event) {
      this.$emit("event-postal-code-updated", String(event.target.value))
    }
  }
}
</script>
