<template>
        <div class="mb-3">
<!--          <label>State</label>-->
          <input
              :value="state"
              @change="onChange"
              class="form-control"
              type="text"
              placeholder="State"/>
        </div>
</template>
<script>
export default {
  name: "StateInput", props: {state: String}, methods: {
    onChange(e) {
      this.$emit("event-state-updated", String(e.target.value))
    }
  }
}
</script>
