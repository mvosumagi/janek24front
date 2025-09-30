<template>
        <div class="mb-3">
<!--          <label class="col-4 text-start">Company name </label>-->
          <input
              :value="companyName"
              @input="handleCompanyNameInput"
              class="form-control"
              type="text"
              placeholder="Company name"/>
        </div>
</template>
<script>
export default {
  name: "CompanyNameInput",
  props: {
    companyName: String
  },
  methods: {
    handleCompanyNameInput(event) {
      this.$emit("event-companyname-updated", event.target.value);
    }
  }
}
</script>
