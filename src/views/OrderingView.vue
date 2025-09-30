<template>
  <div class="ordering-view">
    <h2>Order Service</h2>
    <br>
    <div class="card">
      <img v-if="service.imageData" :src="service.imageData" alt="Service Image" class="thumbnail"/>

      <p class="short-desc"><strong>Summary:</strong> {{ service.descriptionShort }}</p>

      <div class="long-desc">
        <strong>Details:</strong>
        <p><b>{{ service.descriptionLong }}</b></p>
      </div>

      <div class="date-time-section">
        <div class="form-group">
          <label for="serviceDate"><b>Select Service Date</b>:</label>
          <flat-pickr
              v-model="serviceDate"
              id="serviceDate"
              :config="datePickerConfig"
              class="form-control"
          />
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

        <button @click="submitOrder" class="btn btn-primary">Submit Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import SearchService from "@/services/SearchService";
import NavigationService from "@/services/NavigationService";
import OrderingServiceService from "@/services/OrderingService";
import OrderingService from "@/services/OrderingService";


export default {
  name: 'OrderingView',
  components: { flatPickr },
  data() {
    return {
      service: {},
      serviceDate: null,
      serviceTime: null,
      orderComment: '',
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
    };
  },
  methods: {
    fetchService() {
      const id = this.$route.params.serviceId;
      if (!id) {
        NavigationService.navigateToErrorView();
        return;
      }
      SearchService.getServiceById(id)
          .then(response => {
            this.service = response.data;
          })
          .catch(() => NavigationService.navigateToErrorView());
    },
    submitOrder() {
      console.log("Date:", this.serviceDate);
      console.log("Time:", this.serviceTime);
      console.log("Comment:", this.orderComment);

      const order = {
        serviceId: this.service.id,
        date: this.serviceDate,
        time: this.serviceTime,
        comment: this.orderComment
      };

      OrderingServiceService.submit(order)
          .then(() => alert("Order submitted successfully!"))
          .catch(error => alert("Error submitting order: " + error.message));
    }
  },
  mounted() {
    this.fetchService();
  }
};
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
