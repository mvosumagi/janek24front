<template>
  <div class="form-floating mb-3">
    <input :value="companyName" @input="handleCompanyNameInput" type="text" class="form-control"
           placeholder="Company name"/>
    <label>Company name</label>
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
