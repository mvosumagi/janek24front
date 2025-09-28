<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Postal Code</label>
          <input :value="postalCode" @change="onChange" type="text" placeholder="Postal Code"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PostalCodeInput", props: {postalCode: String}, methods: {
    onChange(e) {
      this.$emit("event-postal-code-updated", String(e.target.value))
    }
  }
}
</script>
