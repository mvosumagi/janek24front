<template>

  <nav class="menu">
    <router-link v-if="$route.path !== '/home'" to="/home"> Home</router-link>
    <router-link v-if="$route.path !== '/service'" to="/service"> Service</router-link>
    <router-link v-if="$route.path !== '/home'" to="/my-orders"> My orders</router-link>
    <router-link v-if="$route.path !== '/search'" to="/search"> Search</router-link>

  </nav>
  <router-view/>

</template>

<style>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.menu router-link:not(:first-child)::before {
  content: " | ";
  margin: 0 4px;
  color: #999;
}
</style>

<script>


import {defineComponent} from "vue";
import ServiceView from "@/views/ServiceView.vue";

export default defineComponent({
  components: {ServiceView}
})
</script>