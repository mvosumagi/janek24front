<template>
  <div class="container text-center">

    <AlertDanger :message="errorMessage"/>
    <AlertSuccess :message="successMessage"/>

    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Personal Information</h5>

        <!--        <div class="row justify-content-center">-->
        <!--          <div class="col col-4">-->

        <table class="table">
          <tbody>
          <FirstnameInput :firstname="user.firstName" @event-first-name-updated="firstNameUpdated"/>
          <div v-if="!isLoggedIn">
            <UsernameInput :username="user.username" @event-username-updated="usernameUpdated"/>
          </div>
          <LastNameInput :lastname="user.lastName" @event-last-name-updated="lastNameUpdated"/>
          <EmailInput :email="user.email" @event-email-updated="emailUpdated"/>
          <PhoneInput :phone="user.phoneNumber" @event-phone-updated="phoneUpdated"/>
          <CountryDropdown :country-id="user.countryId" @event-country-updated="handleCountryUpdate"/>
          <CityDropdown :country-id="user.countryId" :city-id="user.cityId" @event-city-updated="setUserCityId"/>
          <StateInput :state="user.state" @event-state-updated="stateUpdated"/>
          <AddressInput :address="user.address" @event-address-updated="addressUpdated"/>
          <PostalCodeInput :postal-code="user.postalCode" @event-postal-code-updated="postalCodeUpdated"/>
          <div v-if="!isLoggedIn">
            <PasswordInput :password="user.password" @event-password-updated="passwordUpdated"/>
          </div>
          <div v-if="!isLoggedIn">
            <PasswordConfirmInput :password2="user.password2" @event-password-confirm-updated="password2Updated"/>
          </div>
          <CompanyCheckbox :is-company="user.isCompany" @event-is-company-updated="isCompanyUpdated"/>
          <div v-if="user.isCompany">
            <CompanyNameInput :company-name="user.companyName" @event-companyname-updated="companyNameUpdated"/>
            <RegNoInput :reg-no="user.regNo" @event-regno-updated="regNoUpdated"/>
          </div>
          <div v-if="!isLoggedIn">
            <button @click="createUser" type="button" class="btn btn-outline-primary">Create user</button>
          </div>
          <div v-if="isLoggedIn">
            <button @click="createUser" type="button" class="btn btn-outline-primary">Save Changes</button>
          </div>
          <div v-if="isLoggedIn">
            <PasswordInput :password="user.password" @event-password-updated="passwordUpdated"/>
            <PasswordConfirmInput :password2="user.password2" @event-password-confirm-updated="password2Updated"/>
            <button @click="" type="button" class="btn btn-outline-primary">Change Password</button>
          </div>
          </tbody>
        </table>
      </div>
      <!--        </div>-->
      <!--      </div>-->
    </div>
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
import CityDropdown from "@/components/user/CityDropdown.vue";
import StateInput from "@/components/user/StateInput.vue";
import AddressInput from "@/components/user/AddressInput.vue";
import PasswordInput from "@/components/user/PasswordInput.vue";
import PasswordConfirmInput from "@/components/user/PasswordConfirmInput.vue";
import UserService from "@/services/UserService";
import PostalCodeInput from "@/components/user/PostalCodeInput.vue";
import CountryDropdown from "@/components/user/CountryDropdown.vue";
import SessionStorageService from "@/services/SessionStorageService";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "UserView",
  components: {
    AlertSuccess,
    AlertDanger,
    CountryDropdown,
    PostalCodeInput,
    EmailInput,
    FirstnameInput,
    UsernameInput,
    LastNameInput,
    PhoneInput,
    CompanyCheckbox,
    CompanyNameInput,
    RegNoInput,
    CityDropdown,
    StateInput,
    AddressInput,
    PasswordInput,
    PasswordConfirmInput
  },
  data() {
    return {
      isLoggedIn: false,
      errorMessage: "",
      successMessage: "",
      password2: "",
      user: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        countryId: 0,
        cityId: 0,
        state: "",
        address: "",
        password: "",
        postalCode: "",
        isCompany: true,
        companyName: "",
        regNo: ""
      },
      usernameTaken: false,
      usernameCheckTimer: null,
      alertTimer: null
    }
  },
  computed: {
    passwordsMatch() {
      return !this.user.password2 || this.user.password === this.user.password2;
    }
  },
  methods: {
    updateAuth() {
      this.isLoggedIn = !!(SessionStorageService?.isLoggedIn?.() || sessionStorage.getItem("userId"));
    },
    displayErrorMessage(message) {
      this.errorMessage = message
      setTimeout(this.resetAllMessages, 3000)
    },
    displaySuccessMessage(message) {
      this.successMessage = message
      setTimeout(this.resetAllMessages, 3000)
    },
    resetAllMessages() {
      this.errorMessage = ""
      this.successMessage = ""
    },
    requiredFilled() {
      const req = ["username", "firstName", "lastName", "email", "countryId", "cityId", "postalCode", "password"];
      if (this.user.isCompany) req.push("companyName", "regNo");
      return req.every(k => !!this.user[k]);
    },
    usernameUpdated(username) {
      this.user.username = username;
      this.debouncedCheckUsername();
    },
    firstNameUpdated(firstName) {
      this.user.firstName = firstName;
    },
    lastNameUpdated(lastName) {
      this.user.lastName = lastName;
    },
    emailUpdated(email) {
      this.user.email = email;
    },
    phoneUpdated(phoneNumber) {
      this.user.phoneNumber = phoneNumber;
    },
    handleCountryUpdate(countryId) {
      this.user.countryId = countryId;
      this.user.cityId = 0;
    },
    setUserCityId(cityId) {
      this.user.cityId = cityId;
    },
    stateUpdated(state) {
      this.user.state = state;
    },
    addressUpdated(address) {
      this.user.address = address;
    },
    postalCodeUpdated(postalCode) {
      this.user.postalCode = postalCode;
    },
    passwordUpdated(password) {
      this.user.password = password;
    },
    password2Updated(password2) {
      this.user.password2 = password2;
    },
    isCompanyUpdated(isCompany) {
      this.user.isCompany = isCompany;
      if (!isCompany) {
        this.user.companyName = "";
        this.user.regNo = "";
      }
    },
    companyNameUpdated(companyName) {
      this.user.companyName = companyName;
    },
    regNoUpdated(regNo) {
      this.user.regNo = regNo;
    },
    async checkUsernameAvailability() {
      if (!this.user.username) {
        this.usernameTaken = false;
        return;
      }
      try {
        const available = await UserService.checkUsername(this.user.username);
        this.usernameTaken = !available;
        if (this.usernameTaken) this.displayErrorMessage("Kasutajanimi on juba võetud");
      } catch {
        this.usernameTaken = false;
      }
    },
    debouncedCheckUsername() {
      clearTimeout(this.usernameCheckTimer);
      this.usernameCheckTimer = setTimeout(this.checkUsernameAvailability, 400);
    },
    async createUser() {
      if (this.user.password !== this.user.password2) {
        this.displayErrorMessage("Paroolid erinevad");
        return;
      }
      if (!this.requiredFilled()) {
        this.displayErrorMessage("Täida kõik väljad");
        return;
      }
      if (this.usernameTaken) {
        this.displayErrorMessage("Kasutajanimi on juba võetud");
        return;
      }
      const {password2, ...payload} = this.user;

      UserService.sendCreateUserRequest(this.user)
          .then(() => this.displaySuccessMessage("User created successfully"))
          .catch(() => this.displayErrorMessage("Kasutaja loomine ebaõnnestus"))
    }
  },
  mounted() {
    this.updateAuth();
    window.addEventListener("storage", this.updateAuth);
    window.addEventListener("session-storage", this.updateAuth);
    window.addEventListener("local-storage", this.updateAuth);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) this.updateAuth();
    });
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateAuth);
    window.removeEventListener("session-storage", this.updateAuth);
    window.removeEventListener("local-storage", this.updateAuth);
  },
  watch: {
    $route() {
      this.updateAuth();
    }
  }
}
</script>
