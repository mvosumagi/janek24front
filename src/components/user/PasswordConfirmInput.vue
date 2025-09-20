<template>
  <div class="row mb-4 align-items-center">
    <label class="col-4 text-start">Retype password</label>
    <div class="col-8">
      <input :value="password2" @input="handlePasswordConfirmInput" type="password"
             class="form-control"
      />
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
