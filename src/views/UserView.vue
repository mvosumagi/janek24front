<template>
  <div>
    <UsernameInput :username="user.username" @event-username-updated="usernameUpdated"/>

    <FirstnameInput :firstname="user.firstName" @event-first-name-updated="firstNameUpdated"/>
    <LastNameInput :lastname="user.lastName" @event-last-name-updated="lastNameUpdated"/>

    <EmailInput :email="user.email" @event-email-updated="emailUpdated"/>
    <PhoneInput :phone="user.phone" @event-phone-updated="phoneUpdated"/>

    <CompanyCheckbox :is-company="user.isCompany" @event-is-company-updated="isCompanyUpdated"/>

    <div v-if="user.isCompany">
      <CompanyNameInput :company-name="user.companyName" @event-companyname-updated="companyNameUpdated"/>
      <RegNoInput :reg-no="user.regNo" @event-regno-updated="regNoUpdated"/>
    </div>

    <CityInput :city="user.city" @event-city-updated="cityUpdated"/>
    <StateInput :state="user.state" @event-state-updated="stateUpdated"/>
    <AddressInput :address="user.address" @event-address-updated="addressUpdated"/>

    <PasswordInput :password="user.password" @event-password-updated="passwordUpdated"/>
    <PasswordConfirmInput :password2="user.password2" @event-password-confirm-updated="password2Updated"/>

    <button @click="createUser" type="button">Create user</button>
  </div>
</template>

<script>
import UsernameInput from "@/components/user/UsernameInput.vue";
import FirstnameInput from "@/components/user/FirstNameInput.vue";
import LastNameInput from "@/components/user/LastNameInput.vue";
import EmailInput from "@/components/user/EmailInput.vue";
import PhoneInput from "@/components/user/PhoneInput.vue";
import CompanyCheckbox from "@/components/user/CompanyCheckbox.vue";
import RegNoInput from "@/components/user/RegNoInput.vue";
import CompanyNameInput from "@/components/user/CompanyNameInput.vue";
import CityInput from "@/components/user/CityInput.vue";
import StateInput from "@/components/user/StateInput.vue";
import AddressInput from "@/components/user/AddressInput.vue";
import PasswordInput from "@/components/user/PasswordInput.vue";
import PasswordConfirmInput from "@/components/user/PasswordConfirmInput.vue";
import UserService from "@/services/UserService";

export default {
  name: "UserView",
  components: {
    EmailInput,
    FirstnameInput,
    UsernameInput,
    LastNameInput,
    PhoneInput,
    CompanyCheckbox,
    CompanyNameInput,
    RegNoInput,
    CityInput,
    StateInput,
    AddressInput,
    PasswordInput,
    PasswordConfirmInput
  },
  data() {
    return {
      user: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        isCompany: false,
        companyName: "",
        regNo: "",
        city: "",
        state: "",
        address: "",
        password: "",
        password2: ""
      }
    }
  },
  methods: {
    usernameUpdated(username) {
      this.user.username = username
    },
    firstNameUpdated(v) {
      this.user.firstName = v
    },
    lastNameUpdated(v) {
      this.user.lastName = v
    },
    emailUpdated(v) {
      this.user.email = v
    },
    phoneUpdated(v) {
      this.user.phone = v
    },
    isCompanyUpdated(v) {
      this.user.isCompany = v
    },
    companyNameUpdated(v) {
      this.user.companyName = v
    },
    regNoUpdated(v) {
      this.user.regNo = v
    },
    cityUpdated(v) {
      this.user.city = v
    },
    stateUpdated(v) {
      this.user.state = v
    },
    addressUpdated(v) {
      this.user.address = v
    },
    passwordUpdated(v) {
      this.user.password = v
    },
    password2Updated(v) {
      this.user.password2 = v
    },

    createUser() {
      this.sendCreateUserRequest()
    },
    sendCreateUserRequest() {
      UserService.sendCreateUserRequest(this.user)
    }
  }
}
</script>

<style scoped>
:deep(.mb-3) {
  margin-bottom: .3rem !important;
}
</style>
