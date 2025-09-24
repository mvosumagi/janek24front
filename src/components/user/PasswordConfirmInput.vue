<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Retype password </label>
    <input :value="password2" @input="handlePasswordConfirmInput" type="password"/>
        </div>
      </div>
    </div>
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
