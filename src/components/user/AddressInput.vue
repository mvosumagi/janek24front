<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label>Address</label>
          <input :value="address" @input="handleAddressInput" type="text" placeholder="Kännu 5 Kuuse küla"/>
        </div>
      </div>
    </div>
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
