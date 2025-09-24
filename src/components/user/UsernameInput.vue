<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Username</label>
    <input :value="username" @change="handleUserNameInput" type="text"  placeholder="username"/>
        </div>
      </div>
    </div>
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
