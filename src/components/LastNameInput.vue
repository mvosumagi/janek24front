<template>
  <div class="form-floating mb-3">
    <input :value="lastname" @change="handleLastNameInput" type="text" class="form-control" placeholder="Last name"/>
    <label>Last name</label>
  </div>
</template>

<script>
export default {
  name: "LastnameInput",
  props: {
    lastname: String
  },

  methods: {

    handleLastNameInput(event) {
      this.$emit("event-username-updated", String(event.target.value))
    }
  }
}
</script>
