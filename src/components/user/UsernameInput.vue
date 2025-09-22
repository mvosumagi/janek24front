<template>
  <div class="form-floating mb-3">
    <input :value="username" @change="handleUserNameInput" type="text" class="form-control" placeholder="username"/>
    <label>Username</label>
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
      this.$emit("event-username-updated", String(event.target.value))
    }
  }
}
</script>
