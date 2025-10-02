<template>
  <div class="container text-center">

    <AlertDanger :message="errorMessage"/>
    <AlertSuccess :message="successMessage"/>

    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">
          <template v-if="isLoggedIn">Edit Profile</template>
          <template v-else>Register User</template>
        </h5>
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading user data...</p>
        </div>

        <form @submit.prevent="createUser" v-if="!loading">
          <table class="table">
            <tbody>
            <tr>
              <td><label for="firstName">First Name</label></td>
              <td>
                <FirstnameInput :firstname="user.firstName" @event-first-name-updated="setUserFirstName"/>
              </td>
            </tr>

            <tr v-if="!isLoggedIn">
              <td><label for="username">Username</label></td>
              <td>
                <UsernameInput :username="username" @event-username-updated="setUsername"/>
              </td>
            </tr>

            <tr>
              <td><label for="lastName">Last Name</label></td>
              <td>
                <LastNameInput :lastname="user.lastName" @event-last-name-updated="setUserLastName"/>
              </td>
            </tr>

            <tr>
              <td><label for="email">Email</label></td>
              <td>
                <EmailInput :email="user.email" @event-email-updated="setUserEmail"/>
              </td>
            </tr>

            <tr>
              <td><label for="phone">Phone Number</label></td>
              <td>
                <PhoneInput :phone="user.phoneNumber" @event-phone-updated="setUserPhoneNumber"/>
              </td>
            </tr>

            <tr>
              <td><label for="country">Country</label></td>
              <td>
                <CountryDropdown :country-id="user.countryId" @event-country-updated="handleCountryUpdate"/>
              </td>
            </tr>

            <tr>
              <td><label for="city">City</label></td>
              <td>
                <CityDropdown :country-id="user.countryId" :city-id="user.cityId" @event-city-updated="setUserCityId"/>
              </td>
            </tr>

            <tr>
              <td><label for="state">State</label></td>
              <td>
                <StateInput :state="user.state" @event-state-updated="stateUpdated"/>
              </td>
            </tr>

            <tr>
              <td><label for="address">Address</label></td>
              <td>
                <AddressInput :address="user.address" @event-address-updated="addressUpdated"/>
              </td>
            </tr>

            <tr>
              <td><label for="postalCode">Postal Code</label></td>
              <td>
                <PostalCodeInput :postal-code="user.postalCode" @event-postal-code-updated="postalCodeUpdated"/>
              </td>
            </tr>

            <tr v-if="!isLoggedIn">
              <td><label for="password">Password</label></td>
              <td>
                <PasswordInput :password="password" @event-password-updated="setPassword"/>
              </td>
            </tr>

            <tr v-if="!isLoggedIn">
              <td><label for="passwordConfirm">Confirm Password</label></td>
              <td>
                <PasswordConfirmInput :passwordRetype="passwordRetype" @event-password-confirm-updated="setPasswordRetype"/>
              </td>
            </tr>

            <tr>
              <td><label for="isCompany">Company Account</label></td>
              <td>
                <CompanyCheckbox :is-company="user.isCompany" @event-is-company-updated="isCompanyUpdated"/>
              </td>
            </tr>

            <tr v-if="user.isCompany">
              <td><label for="companyName">Company Name</label></td>
              <td>
                <CompanyNameInput :company-name="user.companyName" @event-companyname-updated="companyNameUpdated"/>
              </td>
            </tr>

            <tr v-if="user.isCompany">
              <td><label for="regNo">Registration Number</label></td>
              <td>
                <RegNoInput :reg-no="user.regNo" @event-regno-updated="regNoUpdated"/>
              </td>
            </tr>
            </tbody>
          </table>

          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary me-2">
              <template v-if="isLoggedIn">Save Changes</template>
              <template v-else>Create User</template>
            </button>

            <a v-if="isLoggedIn" href="#" class="d-block mt-3" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
              Change Password
            </a>
          </div>
        </form>

      </div>
    </div>

    <ChangePasswordModal v-if="isLoggedIn" />
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
import ChangePasswordModal from "@/components/user/ChangePasswordModal.vue";

export default {
  name: "UserView",
  components: {
    ChangePasswordModal,
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
      loading: false,

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
      }
    }
  },
  methods: {

    createUser() {
      if (this.isLoggedIn) {
        this.updateUser();
        return;
      }

      if (this.password !== this.passwordRetype) {
        this.displayErrorMessage("Paroolid erinevad");
        return;
      }
      if (!this.allFieldsAreWithCorrectInput()) {
        this.displayErrorMessage("Täida kõik väljad");
        return;
      }

      UserService.sendCreateUserRequest(this.username, this.password, this.user)
          .then(() => NavigationService.navigateToLoginView())
          .catch(error => this.handleCreateUserErrorResponse(error));
    },

    updateUser() {
      if (!this.allFieldsAreWithCorrectInput()) {
        this.displayErrorMessage("Täida kõik väljad");
        return;
      }

      const userId = sessionStorage.getItem("userId");
      UserService.sendPutUpdateUserRequest(userId, this.user)
          .then(() => this.displaySuccessMessage("Profile updated successfully!"))
          .catch(() => this.displayErrorMessage("Failed to update profile"));
    },

    handleCreateUserErrorResponse(error) {
      this.errorResponse = error.response.data

      if (error.response.status === 403 && this.errorResponse.errorCode === 132132) {
        this.errorMessage = this.errorResponse.message
      }
      setTimeout(this.resetAllMessages, 4000)
    },

    updateAuth() {
      this.isLoggedIn = !!(SessionStorageService?.isLoggedIn?.() || sessionStorage.getItem("userId"));
    },

    displayErrorMessage(message) {
      this.errorMessage = message
      setTimeout(this.resetAllMessages, 4000)
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
        await this.$nextTick();
        this.user.cityId = Number(data.cityId || 0);

        this.user.state = data.state || "";
        this.user.address = data.address || "";
        this.user.postalCode = data.postalCode || "";
        this.user.isCompany = !!data.isCompany;
        this.user.companyName = data.companyName || "";
        this.user.regNo = data.regNo || "";
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

<style scoped>
</style>