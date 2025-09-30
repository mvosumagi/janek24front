<template>
        <div class="mb-3">
<!--          <label>Confirm Password</label>-->
          <input
              :value="passwordRetype"
              @input="handlePasswordRetypeInput"
              class="form-control"
              type="password"
              placeholder="Repeat password"/>
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
