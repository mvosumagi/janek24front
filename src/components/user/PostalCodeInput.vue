<template>
        <div class="mb-3">
<!--          <label>Postal Code</label>-->
          <input
              :value="postalCode"
              @change="onChange"
              class="form-control"
              type="text"
              placeholder="Postal Code"/>
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
