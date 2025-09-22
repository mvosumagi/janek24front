<script setup>

</script>

<template>

  <div class="mb-3">
    <label class="form-label">Kasutajanimi</label>
    <input v-model="username" type="text" class="form-control">
  </div>
  <div class="mb-3">
    <label class="form-label">Parool</label>
    <input v-model="password" type="password" class="form-control">
  </div>
  <button @click="login" type="submit" class="btn btn-outline-primary">Logi sisse</button>

</template>

<script>
import LoginService from "@/services/LoginService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    }
  }
  ,
  methods: {
    sendLoginRequest() {
      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginRequestResponse(response))
          .catch(error => this.handleLoginRequestError(error))
          .catch(error => (error))
    },

    login() {
      if (this.allFieldsAreWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.sendLoginRequest()
      this.handleFieldsIncorrectInputAlert();
      }
    },
    handleFieldsIncorrectInputAlert() {
      this.message = 'Täida kõik väljad';
      setTimeout(this.resetErrorMessage, 4000);
    },
    resetErrorMessage() {
      this.errorMessage = ''
    },
    allFieldsAreWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },
    handleLoginRequestResponse(response) {
      this.loginResponse = response.data
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      // this.$emit('event-user-logged-in')
      // // todo: menüüst ära peita "Sisse logimine"
      // // todo: menüüsse kuvada "Logi välja"
      NavigationService.navigateToUserView()
    },
    handleLoginRequestError(error) {
      this.errorResponse = error.response.data

      if (error.response.status === 403 && this.errorResponse.errorCode === 111) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetErrorMessage, 4000)
      } else {
        NavigationService.navigateToErrorView()
      }

    },






  }
}

</script>


<style scoped>

</style>