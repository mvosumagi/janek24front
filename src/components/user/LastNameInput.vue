<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Last name </label>
    <input :value="lastname" @change="handleLastNameInput" type="text"
           placeholder="Last name"/>

        </div>
      </div>
    </div>
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
