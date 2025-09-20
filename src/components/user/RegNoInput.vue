<template>
  <div class="form-floating mb-3">
    <input  :value="regNo"   @input="handleRegNoInput"   type="text"         class="form-control"         placeholder="Registration No"/>
    <label>Registration No</label>
  </div>
</template>

<script>
export default {
  name: "RegNoInput",
  props: {
    regNo: String
  },
  methods: {
    handleRegNoInput(event) {
      this.$emit("event-regno-updated", event.target.value);
    }
  }
}
</script>
