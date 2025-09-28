

<template>
  <div class="mb-3">
    <label>First name </label>
    <input
        :value="firstname"
        @change="handleFirstNameInput"
        type="text"
        placeholder="First name"
    />
  </div>
</template>

<script>
export default {
  name: "FirstNameInput",
  props: {
    firstname: String
  },
  methods: {
    handleFirstNameInput(event) {
      this.$emit("event-first-name-updated", String(event.target.value))
    }
  }
}
</script>
