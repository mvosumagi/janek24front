<template>
  <div class="row mb-3 align-items-center">
    <label class="col-4 text-start">Password</label>
    <div class="col-8">
      <input :value="password" @input="handlePasswordInput" type="password"
             class="form-control"/>
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
