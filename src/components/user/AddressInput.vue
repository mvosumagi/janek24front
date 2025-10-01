<template>
        <div class="mb-3">
<!--          <label>Address</label>-->
          <input
              :value="address"
              @input="handleAddressInput"
              class="form-control"
              type="text"
              placeholder="Kännu 5 Kuuse küla"/>
  </div>
</template>

<script>
export default {
  name: "AddressInput",
  props: {
    address: String
  },
  methods: {
    handleAddressInput(event) {
      this.$emit("event-address-updated", String(event.target.value))
    }
  }
}
</script>
