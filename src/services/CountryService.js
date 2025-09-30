import axios from "axios";

export default {
    getCountries() {
        return axios.get("/countries");
    }
};