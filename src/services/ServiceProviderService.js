import axios from "axios";

export default {
    createService(service,userId) {
        return axios.post("/teenus", service, {
            params: {
                userId: userId
            }
        });
    }
};