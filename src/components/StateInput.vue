<template>
  <div class="row mb-3 align-items-center">
    <label class="col-4 text-start">State</label>
    <div class="col-8">
      <input :value="state" @input="handleStateInput" type="text" class="form-control"/>
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
