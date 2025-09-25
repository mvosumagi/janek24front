<template>
  <div>
    <UsernameInput :username="user.username" @event-username-updated="usernameUpdated"/>

    <FirstnameInput :firstname="user.firstName" @event-first-name-updated="firstNameUpdated"/>
    <LastNameInput :lastname="user.lastName" @event-last-name-updated="lastNameUpdated"/>

    <EmailInput :email="user.email" @event-email-updated="emailUpdated"/>
    <PhoneInput :phone="user.phoneNumber" @event-phone-updated="phoneUpdated"/>

    <CountryInput :country-id="user.countryId" @event-country-updated="countryUpdated"/>
    <CityInput :country-id="user.countryId" :city-id="user.cityId" @event-city-updated="cityUpdated"/>

    <StateInput :state="user.state" @event-state-updated="stateUpdated"/>
    <AddressInput :address="user.address" @event-address-updated="addressUpdated"/>
    <PostalCodeInput :postal-code="user.postalCode" @event-postal-code-updated="postalCodeUpdated"/>

    <PasswordInput :password="user.password" @event-password-updated="passwordUpdated"/>
    <PasswordConfirmInput :password2="user.password2" @event-password-confirm-updated="password2Updated"/>

    <CompanyCheckbox :is-company="user.isCompany" @event-is-company-updated="isCompanyUpdated"/>

    <div v-if="user.isCompany">
      <CompanyNameInput :company-name="user.companyName" @event-companyname-updated="companyNameUpdated"/>
      <RegNoInput :reg-no="user.regNo" @event-regno-updated="regNoUpdated"/>
    </div>

    <button @click="createUser" type="button" class="btn btn-outline-primary">Create user</button>
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
        countryId: "",
        cityId: "",
        state: "",
        postalCode: "",
        address: "",
        password: "",
        password2: "",
        isCompany: false,
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
    softAlert(msg) {
      if (this.alertTimer) return;
      alert(msg);
      this.alertTimer = setTimeout(() => {
        this.alertTimer = null;
      }, 1200);
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

    countryUpdated(countryId) {
      this.user.countryId = countryId;
      this.user.cityId = "";
    },
    cityUpdated(cityId) {
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
        if (this.usernameTaken) this.softAlert("Kasutajanimi on juba võetud");
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
        this.softAlert("Paroolid erinevad");
        return;
      }
      if (!this.requiredFilled()) {
        this.softAlert("Täida kõik väljad");
        return;
      }
      if (this.usernameTaken) {
        this.softAlert("Kasutajanimi on juba võetud");
        return;
      }
      const {password2, ...payload} = this.user;
      try {
        const response = await UserService.sendCreateUserRequest(payload);
        if (response.status === 200 || response.status === 201) {
          alert("User created successfully");
        }
      } catch {
        this.softAlert("Kasutaja loomine ebaõnnestus");
      }
    }
  }
}
</script>

<style scoped>
:deep(.mb-3) {
  margin-bottom: .3rem !important;
}

:deep(.mb-3) {
  margin-bottom: .3rem !important;
}

:deep(input[type="text"]),
:deep(input[type="password"]),
:deep(input[type="email"]),
:deep(select) {
  width: 200px;
}


</style>



