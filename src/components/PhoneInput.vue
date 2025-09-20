<template>
  <div class="form-floating mb-3">
    <input
        id="userPhone" :value="userPhone" @input="$emit('event-user-phone-updated', $event.target.value)"
        type="text" class="form-control" placeholder="User phone"
    />
    <label for="username">User name</label>
  </div>
</template>

<script>
export default {
  name: "UsernameInput",
  props: {
    username: String
  }
}
</script>
