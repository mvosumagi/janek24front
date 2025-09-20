<template>
  <div class="form-floating mb-3">
    <input :value="useremail" @input="handleEmailInput" type="text" class="form-control" placeholder="User e-mail"/>
    <label>E-mail</label>
  </div>
</template>

<script>
export default {
  name: "UserEmailInput",
  props: {
    useremail: String
  },
  methods: {

    handleEmailInput(event) {
      this.$emit("event-email-updated", String(event.target.value))
    }
  }
}
</script>
