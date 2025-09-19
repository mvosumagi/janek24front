<template>

  <nav>
    <router-link to="/">Kodu</router-link> |
    <router-link to="/atms">Pangaautomaadid</router-link> |

    <template v-if="isAdmin">
      <router-link to="/location">Asukoht</router-link> |
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



</script>