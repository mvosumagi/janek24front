<template>
  <div>
    <UsernameInput :username="username" @event-username-updated="usernameUpdated"/>
    <FirstnameInput :firstname="firstName" @event-firstname-updated="firstNameUpdated"/>
    <LastNameInput :lastname="lastName" @event-lasttname-updated="lastNameUpdated"/>
    <EmailInput :email="email" @event-email-updated="emailUpdated"/>
    <PhoneInput :phone="phone" @event-phone-updated="phoneUpdated"/>

    <div class="row mb-3 align-items-center"><label class="col-4 text-start">Company</label>
      <div class="col-8 text-start"><input v-model="isCompany" type="checkbox" class="form-check-input"/>
      </div>
    </div>

    <div v-if="isCompany" class="row mb-3 align-items-center"><label class="col-4 text-start">Company details</label>
      <div class="col-8">
        <div class="row g-2">
          <div class="col-6"><input v-model="companyName" type="text" class="form-control" placeholder="Company name"/>
          </div>
          <div class="col-6"><input v-model="regNo" type="text" class="form-control" placeholder="Registration No"/>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import UsernameInput from "@/components/UsernameInput.vue";
import FirstnameInput from "@/components/FirstNameInput.vue";
import LastNameInput from "@/components/LastNameInput.vue";
import EmailInput from "@/components/EmailInput.vue";
import PhoneInput from "@/components/PhoneInput.vue";

export default {
  name: "UserView",
  components: {EmailInput, FirstnameInput, UsernameInput, LastNameInput, PhoneInput},
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
