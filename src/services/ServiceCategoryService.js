import axios from "axios";

export default {
    getServiceCategories() {
        return axios.get("/service-categories");
    }
};