<template>
  <div class="form-floating mb-3">
    <input :value="state" @input="handleStateInput" type="text" class="form-control" placeholder="State"/>
    <label>State</label>
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
