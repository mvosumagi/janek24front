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

    changeProviderService(providerServiceId, service) {
        return axios.put("/service", service, {
            params: {
                providerServiceId: providerServiceId,
            },
        });
    },

    getService(providerServiceId) {
        return axios.get("/service", {
            params: {
                providerServiceId: providerServiceId,
            },
        });
    },
};