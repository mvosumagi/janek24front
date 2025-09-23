<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label >Password </label>
      <input :value="password" @input="handlePasswordInput" type="password"/>
        </div>
      </div>
    </div>
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
