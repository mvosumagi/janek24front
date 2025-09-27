<script setup>

</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>My Orders</h1>
      </div>
    </div>
  </div>

  <section>

    <!--    <table id="myOrdersTable">-->
    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Order Date</th>
        <th>Delivery Date</th>
        <th>Order No</th>
        <th>Status</th>
        <th>Service</th>
        <th>Provider</th>
        <th>Paid Status</th>
        <th>Edit</th>
        <th>Cancel</th>
        <th>Save</th>
      </tr>
      </thead>
      <tbody id="tabelBody">
      <!-- Teenused renderdatakse siia -->
      </tbody>
    </table>

  </section>

</template>