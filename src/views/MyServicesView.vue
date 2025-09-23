<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h1>My Services</h1>
      </div>
    </div>
  </div>

  <button type="button" class="btn btn-primary">Add new service</button>

  <section>

    <table class="table table-striped">

      <!-- On cells (`td` or `th`) -->
      <tr>
        <td class="">#</td>
        <td class="">Service</td>
        <td class="">Type</td>
        <td class="">Valid from</td>
        <td class="">Valid to</td>
        <td class="">React time</td>
        <td class="">Unit cost</td>
        <td class="">Review</td>
        <td class="">Picture</td>
        <td class="">Status</td>
        <td class="">Edit</td>
        <td class="">Delete</td>


      </tr>

    </table>

  </section>

</template>

<style scoped>

</style>

<script>

export default {
  name: 'myServicesRoute'
}
</script>
