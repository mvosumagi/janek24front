<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>My Services</h1>
      </div>
    </div>
  </div>

  <section>

<!--    <table id="myServicesTable">-->
    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Service</th>
        <th>Type</th>
        <th>Valid from</th>
        <th>Valid to</th>
        <th>Unit cost</th>
        <th>Review</th>
        <th>Picture</th>
        <th>Status</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody id="tabelBody">
      <!-- Teenused renderdatakse siia -->
      </tbody>
    </table>
<!--    <button @click="addRow()">Add new service</button>-->
    <button @click="goToService" type="submit" class="btn btn-outline-primary">Add New Service</button>


  </section>

</template>

<style>

</style>

<script>

export default {
  methods: {
    goToService() {
      this.$router.push('/service')
    }
  }
}

</script>
