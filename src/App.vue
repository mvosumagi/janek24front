<template>


  <nav>
    <router-link to="/home">Home</router-link>
    |
    <router-link to="/service">Service</router-link> |

    <router-link to="/MyOrdersView">My orders</router-link>|


    <template v-if="isAdmin">
      <router-link to="/location">Asukoht</router-link>
      |
      <button type="button" class="btn btn-success">L</button>
    </template>

    <template v-if="isLoggedIn">
      <font-awesome-icon @click="startLogOut" class="cursor-pointer" icon="fa-solid fa-right-from-bracket"/>
    </template>

    <template v-if="!isLoggedIn">
      <router-link to="/login">Sisse logimine</router-link>
    </template>

  </nav>
  <router-view @event-user-logged-in="updateNavMenu"/>

</template>

<script>


import {defineComponent} from "vue";
import ServiceView from "@/views/ServiceView.vue";

export default defineComponent({
  components: {ServiceView}
})
</script>