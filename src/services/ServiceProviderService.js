import axios from "axios";

export default {
    createService(service, userId) {
        return axios.post("/service", service, {
            params: {
                userId: userId,
            },
        });
    },
    getUserServices(userId) {
        return axios.get("/services", {
            params: { userId },
        });
    },
    changeService(serviceId, service) {
        return axios.put("/service", service, {
            params: {
                serviceId: serviceId,
            },
        });
    },
    getService(serviceId) {
        return axios.get("/service", {
            params: {
                serviceId: serviceId,
            },
        });
    },
};