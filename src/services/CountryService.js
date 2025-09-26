import axios from "axios";

export default {
  async getCountries() {
    const { data } = await axios.get("/countries");
    return data;
  }
};