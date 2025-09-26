<template>
  <div class="mb-3">
    <label>Last name </label>
    <input :value="lastname" @change="handleLastNameInput" type="text"
           placeholder="Last name"/>

  </div>
</template>

<script>
export default {
  name: "LastNameInput",
  props: {
    lastname: String
  },

  methods: {

    handleLastNameInput(event) {
      this.$emit("event-last-name-updated", String(event.target.value))
    }
  }
}
</script>
