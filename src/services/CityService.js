import axios from "axios";

export default {
  async listByCountry(countryId) {
    const { data } = await axios.get(`/countries/${countryId}/cities`);
    return data;
  }
};
