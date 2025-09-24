<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>First name </label>
          <input
              :value="firstname"
              @change="handleFirstNameInput"
              type="text"
              placeholder="First name"
          />
        </div>
      </div>
    </div>
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
