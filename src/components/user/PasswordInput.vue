<template>
  <div class="form-floating mb-3">
      <input :value="password" @input="handlePasswordInput" type="password"
             class="form-control"/>
      <label >Password</label>
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
      this.$emit("event-email-updated", String(event.target.value))
    }
  }


}
</script>
