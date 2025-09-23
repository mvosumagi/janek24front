<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>E-mail </label>
    <input :value="email" @input="handleEmailInput" type="text"
           placeholder="User e-mail"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmailInput",
  props: {
    email: String
  },
  methods: {

    handleEmailInput(event) {
      this.$emit("event-email-updated", String(event.target.value))
    }
  }
}
</script>
