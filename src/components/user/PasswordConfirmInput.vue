<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Confirm Password</label>
          <input :value="password2" @change="onChange" type="password" placeholder="Repeat password"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PasswordConfirmInput", props: {password2: String}, methods: {
    onChange(e) {
      this.$emit("event-password-confirm-updated", String(e.target.value))
    }
  }
}
</script>
