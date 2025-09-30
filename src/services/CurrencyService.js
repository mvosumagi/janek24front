import axios from "axios";

export default {
    getCurrencies() {
        return axios.get("/currencies");
    }
};