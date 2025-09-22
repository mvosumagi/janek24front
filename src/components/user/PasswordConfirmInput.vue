<template>
  <div class="form-floating mb-3">
    <input :value="password2" @input="handlePasswordConfirmInput" type="password"
           class="form-control"/>
    <label>Retype password</label>
  </div>
</template>

  <script>
    export default {
      name: "PasswordConfirmInput",
      props: {
        password2: String
      }
      ,
      methods: {
        handlePasswordConfirmInput(event) {
          this.$emit("event-password-confirm-updated", String(event.target.value))
        }
      }
    }
  </script>
