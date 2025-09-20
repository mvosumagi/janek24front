<template>
  <div class="row mb-3 align-items-center">
    <label class="col-4 text-start">Company</label>
    <div class="col-8 text-start">
      <input :value="iscompany" @change="handleIsCompanyCheck" type="checkbox"  class="form-check-input"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyCheckbox",
  props: {
    iscompany: Boolean
  },
  methods: {
    handleIsCompanyCheck(event) {
      this.$emit("event-is-company-updated", event.target.checked);
    }
  }


}
</script>
