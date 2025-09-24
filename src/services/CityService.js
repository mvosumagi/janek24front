import axios from "axios";

export default {
  async listByCountry(countryId) {
    const { data } = await axios.get(`/api/countries/${countryId}/cities`);
    return data;
  }
};
