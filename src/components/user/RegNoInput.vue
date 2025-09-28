<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Registration No </label>
          <input :value="regNo" @input="handleRegNoInput" type="text" placeholder="Registration No"/>
        </div>
      </div>
    </div>
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
