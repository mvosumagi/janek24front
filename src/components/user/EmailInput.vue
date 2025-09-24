<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Email</label>
          <input
              :value="email"
              @input="handleEmailInput"
              type="email"
              placeholder="user@example.com"
          />
          <div v-if="error" class="text-danger mt-1">
            Email is not valid
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailInput",
  props: {
    email: String
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    handleEmailInput(event) {
      const value = String(event.target.value)
      this.error = !this.isValidEmail(value)
      this.$emit("event-email-updated", value)
    },
    isValidEmail(value) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(value)
    }
  }
}
</script>
