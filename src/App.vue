<template>

  <nav>
    <router-link to="/home">Home</router-link> |
    <router-link to="/login">Log in</router-link> |
    <router-link to="/user">User</router-link> |
    <router-link to="/search">Search</router-link> |
    <router-link to="/service">Service</router-link> |
    <router-link to="/myservices">My Services</router-link> |
    <router-link to="/myorders">My Orders</router-link> |




  </nav>
  <router-view @event-user-logged-in="updateNavMenu"/>
</template>

<script>



</script>