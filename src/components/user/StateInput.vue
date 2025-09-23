<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>State </label>
          <input :value="state" @input="handleStateInput" type="text" placeholder="State"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StateInput",
  props: {
    state: String
  },
  methods: {

    handleStateInput(event) {
      this.$emit("event-state-updated", String(event.target.value))
    }
  }


}
</script>
