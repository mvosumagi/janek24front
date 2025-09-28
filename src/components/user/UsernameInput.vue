<template>
  <div class="mb-3">
    <label class="me-3">Username</label>
    <input :value="username" @input="handleUserNameInput" type="text" placeholder="username"/>
  </div>
</template>
<script>
export default {
  name: "UsernameInput",
  props: {
    username: String
  },
  methods: {
    handleUserNameInput(event) {
      this.$emit("event-username-updated", event.target.value)
    }
  }
}
</script>
