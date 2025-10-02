<template>
  <div class="ordering-view">
<!--    <h2>Order Service</h2>-->
    <div class="card">
      <img v-if="service.imageData" :src="service.imageData" alt="Service Image" class="thumbnail" />

      <p class="short-desc"><strong>Service:<br></strong> {{ service.descriptionShort }}</p>

      <p class="long-desc"><strong>Details:<br></strong><b>{{ service.descriptionLong }}</b></p>

      <p class="unitcost"><strong>Cost:<br></strong><b>{{ service.unitCost }}€</b></p>

      <form @submit.prevent="submitOrder" class="date-time-section">
        <div class="form-group">
          <label for="serviceDate"><b>Select Service Date</b>:</label>
          <flat-pickr v-model="serviceDate" id="serviceDate" :config="datePickerConfig" class="form-control" />
        </div>

        <div class="form-group">
          <label for="serviceTime"><b>Select Service Time</b>:</label>
          <flat-pickr
              v-model="serviceTime"
              id="serviceTime"
              :config="timePickerConfig"
              class="form-control"
          />
        </div>

        <p>Chosen date: {{ serviceDate }}</p>
        <p>Chosen time: {{ serviceTime }}</p>

        <div class="form-group">
          <label for="orderComment"><b>Additional Comments</b>:</label>
          <textarea
              id="orderComment"
              v-model="orderComment"
              class="form-control"
              rows="4"
              placeholder="Add any notes, preferences or additional info here..."
          ></textarea>
        </div>

        <div class="form-group">
          <button v-if="isLoggedIn" type="submit" class="btn btn-primary">Submit Order</button>
          <button v-else type="button" class="btn btn-primary" @click="goToLogin">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import SearchService from "@/services/SearchService"
import NavigationService from "@/services/NavigationService"
import OrderingService from "@/services/OrderingService"

export default {
  name: 'OrderingView',
  components: { flatPickr },
  data() {
    return {
      service: {},
      serviceDate: null,
      serviceTime: null,
      orderComment: '',
      isLoggedIn: false,
      datePickerConfig: {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d',
        minDate: new Date()
      },
      timePickerConfig: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
      }
    }
  },
  methods: {
    fetchService() {
      const id = this.$route.params.serviceId
      if (!id) {
        NavigationService.navigateToErrorView()
        return
      }
      SearchService.getServiceById(id)
          .then(response => {
            this.service = response.data
          })
          .catch(() => NavigationService.navigateToErrorView())
    },
    submitOrder() {
      const userId = sessionStorage.getItem('userId')
      if (!userId) {
        alert("User not logged in. Please log in to place an order.")
        return
      }

      if (!this.serviceDate) {
        alert("Please select a service date.")
        return
      }

      const serviceId = this.service.id || this.service.serviceId || this.$route.params.serviceId
      if (!serviceId) {
        alert("Service ID is missing. Cannot submit order.")
        return
      }

      const dateString = this.serviceDate instanceof Date
          ? this.serviceDate.toISOString().slice(0, 10)
          : this.serviceDate

      const order = {
        providerServiceId: parseInt(serviceId),
        date: dateString,
        userComment: this.orderComment,
        status: "R",
        confirmationComment: ""
      }

      OrderingService.submit(order, userId)
          .then(() => {
            alert("Order submitted successfully!")
            setTimeout(() => {
              this.$router.push('/my-orders')
            }, 500)
          })
          .catch(error => {
            alert("Error submitting order: " + (error.response?.data?.detail || error.message))
          })
    },
    goToLogin() {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.fetchService()
    this.isLoggedIn = !!sessionStorage.getItem('userId')
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #fff;
  max-width: 600px;
  margin: auto;
  box-shadow: none;
}

textarea.form-control {
  resize: vertical;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
}

.thumbnail {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

.short-desc {
  font-weight: 600;
  margin-bottom: 1rem;
}

.long-desc {
  color: #444;
  margin-bottom: 1rem;
}

.date-time-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}

.btn {
  margin-top: 1rem;
}
</style>