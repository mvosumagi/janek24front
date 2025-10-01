<template>
        <div class="mb-3">
<!--          <label>Password</label>-->
          <input
              :value="password"
              @input="handlePasswordInput"
              class="form-control"
              type="password"/>
        </div>
</template>
<script>
export default {
  name: "PasswordInput",
  props: {
    password: String
  },
  methods: {
    handlePasswordInput(event) {
      this.$emit("event-password-updated", String(event.target.value))
    }
  }
}
</script>
