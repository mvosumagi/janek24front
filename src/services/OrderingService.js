import axios from "axios"

export default {
    submit(order, userId) {
        return axios.post("/order", order, {
            params: { userId }
        })
    },

    getOrders(userId) {
        return axios.get("/orders", {
            params: { userId }
        })
    }
}
