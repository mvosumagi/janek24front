<template>
  <div class="form-floating mb-3">
          <input :value="address" @input="handleAddressInput" type="text" class="form-control"
             placeholder="Kännu 5 Kuuse küla"/>
      <label>Address</label>
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
