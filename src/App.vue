<template>
  <div id="app">
    <Buttons/>

    <nav class="menu">
      <router-link to="/home">Home</router-link> |
      <router-link to="/service">Service</router-link> |
      <router-link to="/my-orders">My Orders</router-link> |
      <router-link to="/search">Search</router-link>
    </nav>
    <router-view/>

  </div>
</template>

<script>
import Buttons from './components/image/Buttons.vue';

export default {
  name: 'App',
  components: {
    Buttons
  }
}
</script>

<style>
body {
  background-color: #f0f0f0;
  color: #333333;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 40px;
}
</style>
