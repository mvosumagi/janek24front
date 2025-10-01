<template>
  <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>

          <form @submit.prevent="changePassword">
            <div class="mb-3">
              <label for="newPassword" class="form-label">New Password</label>
              <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  v-model="newPassword"
                  required
              >
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm New Password</label>
              <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
              >
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="changePassword">Change Password</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "ChangePasswordModal",
  components: {
    AlertDanger,
    AlertSuccess
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      successMessage: ""
    }
  },
  methods: {
    async changePassword() {
      this.resetAllMessages();

      if (!this.newPassword || !this.confirmPassword) {
        this.displayErrorMessage("Täida kõik väljad");
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.displayErrorMessage("Paroolid erinevad");
        return;
      }

      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        this.displayErrorMessage("User not found");
        return;
      }

      try {
        await UserService.changePassword(userId, this.newPassword);
        this.displaySuccessMessage("Parool edukalt uuendatud!");

        this.newPassword = "";
        this.confirmPassword = "";

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      } catch (error) {
        this.handleErrorResponse(error);
      }
    },

    handleErrorResponse(error) {
      if (error.response?.status === 403 && error.response?.data?.errorCode === 132133) {
        this.displayErrorMessage("Uus parool ei tohi olla sama mis vana parool");
      } else if (error.response?.status === 404) {
        this.displayErrorMessage("Kasutajat ei leitud");
      } else if (error.response?.data?.message) {
        this.displayErrorMessage(error.response.data.message);
      } else {
        this.displayErrorMessage("Parooli uuendamine ebaõnnestus");
      }
    },

    displayErrorMessage(message) {
      this.errorMessage = message;
      setTimeout(this.resetAllMessages, 4000);
    },

    displaySuccessMessage(message) {
      this.successMessage = message;
      setTimeout(this.resetAllMessages, 4000);
    },

    resetAllMessages() {
      this.errorMessage = "";
      this.successMessage = "";
    }
  }
}
</script>