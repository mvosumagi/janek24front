<template>
  <div>
    <UsernameInput :username="username" @event-username-updated="usernameUpdated"/>
    <FirstnameInput :firstname="firstName" @event-first-name-updated="firstNameUpdated"/>
    <LastNameInput :lastname="lastName" @event-last-name-updated="lastNameUpdated"/>
    <EmailInput :email="email" @event-email-updated="emailUpdated"/>
    <PhoneInput :phone="phone" @event-phone-updated="phoneUpdated"/>

    <CompanyCheckbox :isCompany="isCompany" @event-is-company-updated="isCompanyUpdated"/>

    <div v-if="isCompany">
      <CompanyNameInput :companyName="companyName" @event-companyname-updated="companyNameUpdated"/>
      <RegNoInput :regNo="regNo" @event-regno-updated="regNoUpdated"/>
    </div>

    <CityInput :city="city" @event-city-updated="cityUpdated"/>
    <StateInput :state="state" @event-state-updated="stateUpdated"/>
    <AddressInput :address="address" @event-address-updated="addressUpdated"/>
    <PasswordInput :password="password" @event-password-updated="passwordUpdated"/>
    <PasswordConfirmInput :password2="password2" @event-password-confirm-updated="password2Updated"/>

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
    isCompanyUpdated(isCompany) {
      this.isCompany = isCompany;
    },
    companyNameUpdated(companyName) {
      this.companyName = companyName;
    },
    regNoUpdated(regNo) {
      this.regNo = regNo;
    },
    cityUpdated(city) {
      this.city = city;
    },
    stateUpdated(state) {
      this.state = state;
    },
    addressUpdated(address) {
      this.address = address;
    },
    passwordUpdated(password) {
      this.password = password;
    },
    password2Updated(password2) {
      this.password2 = password2;
    }
  }
}
</script>
