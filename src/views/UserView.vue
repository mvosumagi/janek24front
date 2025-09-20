<template>
  <div>
    <UsernameInput :username="username" @event-username-updated="usernameUpdated"/>
    <FirstnameInput :firstname="firstName" @event-firstname-updated="firstNameUpdated"/>
    <LastNameInput :lastname="lastName" @event-lasttname-updated="lastNameUpdated"/>
    <EmailInput :email="email" @event-email-updated="emailUpdated"/>


  </div>
</template>

<script>
import UsernameInput from "@/components/UsernameInput.vue";
import FirstnameInput from "@/components/FirstNameInput.vue";
import LastNameInput from "@/components/LastNameInput.vue";
import EmailInput from "@/components/EmailInput.vue";

export default {
  name: "UserView",
  components: {EmailInput, FirstnameInput, UsernameInput, LastNameInput},
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone:""

    }
  },
  methods: {
    usernameUpdated(username) {
      this.username = username
    },
    firstNameUpdated(firstName) {
      this.firstName = firstName
    },
    lastNameUpdated(lastName) {
      this.lastName = lastName
    },
    emailUpdated(email) {
      this.email = email
    },
    phoneUpdated(phone) {
      this.phone = phone
    },


  }
}
</script>
