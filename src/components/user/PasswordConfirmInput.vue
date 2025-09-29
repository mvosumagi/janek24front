<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Confirm Password</label>
          <input :value="passwordRetype" @input="handlePasswordRetypeInput" type="password" placeholder="Repeat password"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PasswordConfirmInput",
  props: {
    passwordRetype: String
  },
  methods: {
    handlePasswordRetypeInput(event) {
      this.$emit("event-password-confirm-updated", String(event.target.value))
    }
  }
}
</script>
