<template>
        <div class="mb-3">
<!--          <label>Registration No </label>-->
          <input
              :value="regNo"
              @input="handleRegNoInput"
              class="form-control"
              type="text"
              placeholder="Registration No"/>
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
