import axios from "axios";

export default {
    createService(service,userId) {
        return axios.post("/service", service, {
            params: {
                userId: userId
            }
        });
    }
};