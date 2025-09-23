<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label class="col-4 text-start">Company name </label>
          <input :value="companyName" @input="handleCompanyNameInput" type="text" placeholder="Company name"/>
        </div>
      </div>
    </div>
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
