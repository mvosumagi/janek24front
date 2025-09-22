<template>
  <div class="form-floating mb-3">
    <input :value="email" @input="handleEmailInput" type="text" class="form-control" placeholder="User e-mail"/>
    <label>E-mail</label>
  </div>
</template>

<script>
export default {
  name: "EmailInput",
  props: {
    email: String
  },
  methods: {

    handleEmailInput(event) {
      this.$emit("event-email-updated", String(event.target.value))
    }
  }
}
</script>
