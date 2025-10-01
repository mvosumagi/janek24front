<template>
  <div class="borderless-select">
    <select
        :value="cityId"
        @change="handleCityDropdownChange($event)"
        class="form-control"
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
        this.getCities(newCountryId);
      } else {
        this.cities = [];
      }
    },
  },
  data() {
    return {
      cities: [],
      loading: false,
      error: false
    };
  },
  methods: {
    countryIsSelected(countryId) {
      return countryId && countryId !== 0;
    },
    getCities(countryId) {
      this.loading = true;
      this.error = false;
      CityService.getCountryCities(countryId)
          .then(response => {
            this.cities = response.data;
          })
          .catch(() => {
            this.error = true;
            NavigationService.navigateToErrorView();
          })
          .finally(() => this.loading = false);
    },

    handleCityDropdownChange(event) {
      this.$emit("event-city-updated", Number(event.target.value));
    }
  },
  mounted() {
    // Load cities on mount if countryId is already set
    if (this.countryIsSelected(this.countryId)) {
      this.getCities(this.countryId);
    }
  }
};
</script>
