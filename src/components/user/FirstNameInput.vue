<template>
  <div class="form-floating mb-3">
    <input :value="firstName" @change="handleFirstNameInput" placeholder="First name"/>
    <label>First name</label>
  </div>
</template>

<script>
export default {
  name: "FirstNameInput",
  props: {
    firstName: String
  },
  methods: {
    handleFirstNameInput(event) {
      this.$emit("event-first-name-updated", String(event.target.value))
    }
}
}
</script>
