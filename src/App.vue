<template>

  <nav>
    <router-link to="/home">Home</router-link> |
    <router-link to="/login">Log in</router-link> |
    <router-link to="/user">User</router-link> |



  </nav>
  <router-view @event-user-logged-in="updateNavMenu"/>
</template>

<script>



</script>