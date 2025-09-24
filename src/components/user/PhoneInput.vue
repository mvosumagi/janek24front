<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Phone number </label>
    <input :value="phone" @input="handlePhoneInput"  type="text" placeholder="Phone number"/>

        </div>
      </div>
    </div>
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
