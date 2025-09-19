<template>


  <nav class="menu" >
    <router-link v-if="$route.path !== '/home'" to="/home"> Home</router-link>
    <router-link v-if="$route.path !== '/service'" to="/service"> Service</router-link>
    <router-link v-if="$route.path !== '/home'" to="/my-orders"> My orders</router-link>


    <template v-if="isLoggedIn">
      <font-awesome-icon @click="startLogOut" class="cursor-pointer" icon="fa-solid fa-right-from-bracket"/>
    </template>

    <template v-if="!isLoggedIn">
      <router-link v-show="$route.path == '/home'" to="/login"> Sisse logimine</router-link>
    </template>

  </nav>
  <router-view @event-user-logged-in="updateNavMenu"/>

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