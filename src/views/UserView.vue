<template>
  <div class="container text-center">

    <AlertDanger :message="errorMessage"/>
    <AlertSuccess :message="successMessage"/>

    <div class="row justify-content-center">
      <div class="col col-4">
        <FirstnameInput :firstname="user.firstName" @event-first-name-updated="setUserFirstName"/>

        <div v-if="!isLoggedIn">
          <UsernameInput :username="username" @event-username-updated="setUsername"/>
        </div>

        <LastNameInput :lastname="user.lastName" @event-last-name-updated="setUserLastName"/>

        <EmailInput :email="user.email" @event-email-updated="setUserEmail"/>
        <PhoneInput :phone="user.phoneNumber" @event-phone-updated="setUserPhoneNumber"/>

        <CountryDropdown :country-id="user.countryId" @event-country-updated="handleCountryUpdate"/>
        <CityDropdown :country-id="user.countryId" :city-id="user.cityId" @event-city-updated="setUserCityId"/>

        <StateInput :state="user.state" @event-state-updated="stateUpdated"/>
        <AddressInput :address="user.address" @event-address-updated="addressUpdated"/>
        <PostalCodeInput :postal-code="user.postalCode" @event-postal-code-updated="postalCodeUpdated"/>

        <div v-if="!isLoggedIn">
          <PasswordInput :password="password" @event-password-updated="setPassword"/>
        </div>

        <div v-if="!isLoggedIn">
          <PasswordConfirmInput :passwordRetype="passwordRetype" @event-password-confirm-updated="setPasswordRetype"/>
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
          <PasswordInput :password="user.password" @event-password-updated="setPassword"/>
          <PasswordConfirmInput :passwordRetype="user.password2" @event-password-confirm-updated="setPasswordRetype"/>
          <button @click="" type="button" class="btn btn-outline-primary">Change Password</button>
        </div>


      </div>
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
import NavigationService from "@/services/NavigationService";

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
      username: "",
      password: "",
      passwordRetype: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        countryId: 0,
        cityId: 0,
        state: "",
        address: "",
        postalCode: "",
        isCompany: true,
        companyName: "",
        regNo: ""
      },

      errorResponse: {
        message: "",
        errorCode: 0
      },

      alertTimer: null
    }
  },
  methods: {

    createUser() {
      if (this.password !== this.passwordRetype) {
        this.displayErrorMessage("Paroolid erinevad");
        return;
      }
      if (!this.allFieldsAreWithCorrectInput()) {
        this.displayErrorMessage("Täida kõik väljad");
        return;
      }

      UserService.sendCreateUserRequest(this.username, this.password ,this.user)
          .then(() => NavigationService.navigateToLoginView())
          .catch(error => this.handleCreateUserErrorResponse(error))
    },

    handleCreateUserErrorResponse(error) {
      this.errorResponse = error.response.data

      if ( error.response.status === 403 && this.errorResponse.errorCode === 132132) {
        this.errorMessage = this.errorResponse.message
      }
      setTimeout(this.resetAllMessages, 4000)
    },


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

    allFieldsAreWithCorrectInput() {
      const requiredUserFields = ["firstName", "lastName", "email", "countryId", "cityId", "postalCode"];
      if (this.user.isCompany) requiredUserFields.push("companyName", "regNo");
      let allRequiredFieldsHaveValue = requiredUserFields.every(userFieldName => !!this.user[userFieldName]);

      let countryIsSelected = this.user.countryId > 0;
      let cityIsSelected = this.user.cityId > 0;

      return allRequiredFieldsHaveValue && countryIsSelected && cityIsSelected;
    },

    setUsername(username) {
      this.username = username;
    },

    setUserFirstName(firstName) {
      this.user.firstName = firstName;
    },

    setUserLastName(lastName) {
      this.user.lastName = lastName;
    },

    setUserEmail(email) {
      this.user.email = email;
    },

    setUserPhoneNumber(phoneNumber) {
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

    setPassword(password) {
      this.password = password;
    },
    setPasswordRetype(passwordRetype) {
      this.passwordRetype = passwordRetype;
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


    async loadUser() {
      this.loading = true;
      this.errorMessage = "";
      try {
        const id = sessionStorage.getItem("userId");
        if (!id) throw new Error("missing id");
        const data = await UserService.getUser(id);
        this.user.username = data.username || "";
        this.user.firstName = data.firstName || data.firstname || "";
        this.user.lastName = data.lastName || data.lastname || "";
        this.user.email = data.email || "";
        this.user.phoneNumber = data.phoneNumber || data.phone || "";
        this.user.countryId = Number(data.countryId || 0);
        this.user.cityId = Number(data.cityId || 0);
        this.user.state = data.state || "";
        this.user.address = data.address || "";
        this.user.postalCode = data.postalCode || "";
        this.user.isCompany = !!data.isCompany;
        this.user.companyName = data.companyName || "";
        this.user.regNo = data.regNo || "";
        this.displaySuccessMessage(""); // Data loaded kui vaja debugida
      } catch (e) {
        this.displayErrorMessage("User Data load failed");
      } finally {
        this.loading = false;
      }
    }

  },
  mounted() {
    this.updateAuth();
    if (this.isLoggedIn) this.loadUser();
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
