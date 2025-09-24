<template>
  <div>
    <UsernameInput :username="user.username" @event-username-updated="usernameUpdated"/>

    <FirstnameInput :firstname="user.firstName" @event-first-name-updated="firstNameUpdated"/>
    <LastNameInput :lastname="user.lastName" @event-last-name-updated="lastNameUpdated"/>

    <EmailInput :email="user.email" @event-email-updated="emailUpdated"/>
    <PhoneInput :phone="user.phoneNumber" @event-phone-updated="phoneUpdated"/>
    <CountryInput :country="user.countryId" @event-country-updated="countryUpdated"/>
    <CityInput :city="user.cityId" @event-city-updated="cityUpdated"/>
    <StateInput :state="user.state" @event-state-updated="stateUpdated"/>
    <AddressInput :address="user.address" @event-address-updated="addressUpdated"/>
    <PostalCodeInput :postalcode="user.postalCode" @event-postal-code-updated="postalCodeUpdated"/>

    <PasswordInput :password="user.password" @event-password-updated="passwordUpdated"/>
    <PasswordConfirmInput :password2="user.password2" @event-password-confirm-updated="password2Updated"/>

    <CompanyCheckbox :is-company="user.isCompany" @event-is-company-updated="isCompanyUpdated"/>

    <div v-if="user.isCompany">
      <CompanyNameInput :company-name="user.companyName" @event-companyname-updated="companyNameUpdated"/>
      <RegNoInput :reg-no="user.regNo" @event-regno-updated="regNoUpdated"/>
    </div>

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
import PostalCodeInput from "@/components/user/PostalCodeInput.vue";
import CountryInput from "@/components/user/CountryInput.vue";

export default {
  name: "UserView",
  components: {
    CountryInput,
    PostalCodeInput,
    PostCodeInput: PostalCodeInput,
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
        phoneNumber: "",
        countryId: 1,
        cityId: 1,
        state: "",
        postalCode: "",
        address: "",
        password: "",
        isCompany: false,
        companyName: "",
        regNo: "",

      }
    }
  },
  methods: {
    usernameUpdated(username) {
      this.user.username = username
    },
    firstNameUpdated(firstName) {
      this.user.firstName = firstName
    },
    lastNameUpdated(lastName) {
      this.user.lastName = lastName
    },
    emailUpdated(email) {
      this.user.email = email
    },
    phoneUpdated(phone) {
      this.user.phone = phone
    },
    isCompanyUpdated(isCompany) {
      this.user.isCompany = isCompany
    },
    companyNameUpdated(companyName) {
      this.user.companyName = companyName
    },
    regNoUpdated(regNo) {
      this.user.regNo = regNo
    },
    cityUpdated(city) {
      this.user.city = city
    },
    stateUpdated(state) {
      this.user.state = state
    },
    addressUpdated(address) {
      this.user.address = address
    },
    postCodeUpdated(postalCode) {
      this.user.postalCode = postalCode
    },
    passwordUpdated(password) {
      this.user.password = password
    },
    password2Updated(password2) {
      this.user.password2 = password2
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
