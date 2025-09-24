import axios from "axios";

export default {
  async getCountries() {
    const { data } = await axios.get("/api/countries");
    return data;
  }
};