<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label class="col-4 text-start">City</label>
          <select
              :value="cityId"
              @change="handleCityDropdownChange($event)"
              class="form-select"
              :disabled="!countryId || loading || error"
          >
            <option disabled :value="0">-- Select city --</option>
            <option v-for="city in cities" :key="city.cityId" :value="city.cityId">
              {{ city.cityName }}
            </option>
          </select>
          <small v-if="loading">Loading cities…</small>
          <small v-if="!loading && error" class="text-danger">Failed to load cities</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CityService from "@/services/CityService";
import NavigationService from "@/services/NavigationService";

export default {
  name: "CityDropdown",
  props: {
    countryId: Number,
    cityId: Number
  },
  watch: {
    countryId(newCountryId) {
      if (this.countryIsSelected(newCountryId)) {
        this.getCities(newCountryId)
      }
    },
  },
  data() {
    return {
      cities: [
        {
          cityId: 0,
          cityName: ""
        }
      ],
      loading: false, error: false
    };
  },
  methods: {
    countryIsSelected(countryId) {
      return countryId !== 0
    },
    getCities(countryId) {
      CityService.getCountryCities(countryId)
          .then(response => this.cities = response.data)
          .catch(() => NavigationService.navigateToErrorView())
          .finally(() => this.loading = false)
    },

    handleCityDropdownChange(event) {
      this.$emit("event-city-updated", Number(event.target.value));
    }
  }
};
</script>
