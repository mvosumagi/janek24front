<template>
  <div>
    <UsernameInput :username="username" @event-username-updated="usernameUpdated"/>
    <FirstnameInput :firstname="firstName" @event-firstname-updated="firstNameUpdated"/>
    <LastNameInput :lastname="lastName" @event-lastname-updated="lastNameUpdated"/>
    <EmailInput :email="email" @event-email-updated="emailUpdated"/>
    <PhoneInput :phone="phone" @event-phone-updated="phoneUpdated"/>


    <CompanyCheckbox :isCompany="isCompany" @event-is-company-updated="isCompanyUpdated"/>

    <div v-if="isCompany">
      <CompanyNameInput :companyName="companyName" @event-companyname-updated="companyNameUpdated"/>
      <RegNoInput :regNo="regNo" @event-regno-updated="regNoUpdated"/>

    </div>
  </div>
</template>

<script>
import UsernameInput from "@/components/UsernameInput.vue";
import FirstnameInput from "@/components/FirstNameInput.vue";
import LastNameInput from "@/components/LastNameInput.vue";
import EmailInput from "@/components/EmailInput.vue";
import PhoneInput from "@/components/PhoneInput.vue";
import CompanyCheckbox from "@/components/CompanyCheckbox.vue";
import RegNoInput from "@/components/RegNoInput.vue";
import CompanyNameInput from "@/components/CompanyNameInput.vue";


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
    RegNoInput
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
    }
  }
}
</script>
