<template>
  <div class="form-floating mb-3">
    <input :value="phone" @input="handlePhoneInput"  type="text" class="form-control" placeholder="Phone number"/>
    <label>Phone number</label>
  </div>
</template>

<script>
export default {
  name: "PhoneInput",
  props: {
    phone: String
  },
  methods: {
    handlePhoneInput(event) {
      this.$emit("event-phone-updated", String(event.target.value))
    }
  }
}
</script>
