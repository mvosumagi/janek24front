import axios from "axios";

export default {
    getCountryCities(countryId) {
        return axios.get(`/countries/${countryId}/cities`);
    }
};
