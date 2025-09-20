<template>
  <div class="row mb-3 align-items-center">
    <label class="col-4 text-start">Address</label>
    <div class="col-8">
      <input :value="address" @input="handleAddressInput" type="text"
             class="form-control" placeholder="Kännu 5 Kuuse küla"
      />
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
