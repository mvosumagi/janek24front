<template>
  <div class="ordering-view">
    <h2>Order Service</h2>

    <p class="short-desc"><strong>Summary:</strong> {{ service.descriptionShort }}</p>

    <div class="description-date-container">
      <div class="long-desc">
        <strong>Details:</strong>
        <p>{{ service.descriptionLong }}</p>
      </div>

      <div class="form-group">
        <label for="serviceDate">Select Service Date:</label>
        <flat-pickr
            v-model="serviceDate"
            id="serviceDate"
            :config="datePickerConfig"
            class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="serviceTime">Select Service Time:</label>
        <flat-pickr
            v-model="serviceTime"
            id="serviceTime"
            :config="timePickerConfig"
            class="form-control"
        />
      </div>
    </div>

    <p>Chosen date: {{ serviceDate }}</p>
    <p>Chosen time: {{ serviceTime }}</p>

    <button @click="submitOrder" class="btn btn-primary">Submit Order</button>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import SearchService from "@/services/SearchService";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'OrderingView',
  components: { flatPickr },
  data() {
    return {
      service: {},
      serviceDate: null,
      serviceTime: null,
      datePickerConfig: {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d',
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
      SearchService.getServiceById(id)
          .then(response => {
            this.service = response.data;
          })
          .catch(() => NavigationService.navigateToErrorView());
    },
    submitOrder() {
      // implement order submission logic here
      // You can combine date and time here if needed
    }
  },
  mounted() {
    this.fetchService();
  }
};
</script>

<style scoped>
.description-date-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.long-desc {
  flex: 1;
  text-align: left;
  color: #444;
  min-width: 300px;
}
.form-group {
  min-width: 200px;
}
</style>
