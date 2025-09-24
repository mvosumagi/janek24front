<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>First name </label>
    <input :value="firstName" @change="handleFirstNameInput" placeholder="First name"/>
          </div>
      </div>
    </div>
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
