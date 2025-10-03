<template>
  <div class="container my-4">
    <h1 class="text-center mb-4">My Orders</h1>

    <section>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Date</th>
          <th>Order No</th>
          <th>Service</th>
          <th>Cost</th>
          <th>Service Provider</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <td style="text-align: left;">{{ order.date }}</td>
          <td>{{ index + 1 }}</td>
          <td>{{ order.serviceName || 'Unknown Service' }}</td>
          <td>{{ order.unitCost }} €</td>
          <td>{{ order.providerName || 'Unknown Provider' }}</td>
          <td>{{ formatStatus(order.status) }}</td>
          <td>
            <button class="btn btn-sm btn-info" @click="viewOrder(order)">
              View
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="!orders.length" class="text-center text-muted mt-4">
        You don't have any orders yet.
      </div>
    </section>
  </div>
</template>

<script>
import OrderingService from "@/services/OrderingService"

export default {
  name: "MyOrdersView",
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    const userId = sessionStorage.getItem('userId')
    if (!userId) return

    OrderingService.getOrders(userId)
        .then(response => {
          this.orders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        })
        .catch(error => {
          console.error("Failed to fetch orders:", error)
        })
  },
  methods: {
    formatStatus(status) {
      switch (status) {
        case 'R':
          return 'Requested'
        case 'A':
          return 'Accepted'
        case 'D':
          return 'Declined'
        case 'C':
          return 'Completed'
        default:
          return status
      }
    },
    viewOrder(order) {
      alert(
          `Order details:\n\nDate: ${order.date}\nComment: ${order.userComment}\nStatus: ${this.formatStatus(order.status)}`
      )
    }
  }
}
</script>

<style scoped>
.btn-info {
  color: white;
}
</style>
