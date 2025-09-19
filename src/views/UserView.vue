<script setup>

</script>

<template>



  <div class="mb-3">
    <label class="form-label">Kasutajanimi</label>
    <input v-model="username" type="string" class="form-control">
  </div>
  <div class="mb-3">
    <label class="form-label">Eesnimi</label>
    <input v-model="firstname" type="string" class="form-control">
  </div>
  <div class="mb-3">
    <label class="form-label">Perekonnanimi</label>
    <input v-model="lastname" type="password" class="form-control">

  </div>

</template>

<style scoped>

</style>