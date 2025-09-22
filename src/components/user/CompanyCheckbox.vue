<template>
  <div class="form-check mb-3">
    <input :checked="isCompany" @change="handleIsCompanyCheck" type="checkbox" class="form-check-input"/>
    <label >Company</label>
  </div>

</template>

<script>
export default {
  name: "CompanyCheckbox",
  props: {
    isCompany: Boolean
  },
  emits: ["event-is-company-updated"],
  methods: {
    handleIsCompanyCheck(event) {
      this.$emit("event-is-company-updated", event.target.checked);
    }
  }


}
</script>