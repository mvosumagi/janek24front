import axios from "axios";

export default {

    sendGetServicesCategoryRequest() {
        return axios.get('/api/service-categories')
    },

}