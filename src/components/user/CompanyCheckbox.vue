<template>
  <div class="form-floating mb-3">
    <input :value="iscompany" @change="handleIsCompanyCheck" type="checkbox" class="form-check-input"/>
    <label>Company</label>
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
