<template>
  <div class="form-floating mb-3">
    <input :value="firstName" @change="handleFirstNameInput" type="text" class="form-control" placeholder="First name"/>
    <label>Firstname</label>
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
