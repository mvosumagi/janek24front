<template>
  <div class="mb-3">
    <select
        :value="countryId"
        @change="handleCountryDropdownChange"
        class="form-control"
    >
      <option disabled :value="0">-- Select country --</option>
      <option v-for="country in countries" :key="country.countryId" :value="country.countryId">
        {{ country.countryName }}
      </option>
    </select>
    <small v-if="loading">Loading countries…</small>
    <small v-if="error" class="text-danger">Failed to load countries</small>
  </div>
</template>

<script>
import CountryService from "@/services/CountryService";
import NavigationService from "@/services/NavigationService";

export default {
  name: "CountryDropdown",
  props: {
    countryId: Number
  },
  data() {
    return {
      countries: [],
      loading: false,
      error: false
    };
  },
  methods: {
    getCountries() {
      this.loading = true;
      this.error = false;
      CountryService.getCountries()
          .then(response => {
            this.countries = response.data;
          })
          .catch(() => {
            this.error = true;
            NavigationService.navigateToErrorView();
          })
          .finally(() => this.loading = false);
    },
    handleCountryDropdownChange(e) {
      this.$emit("event-country-updated", Number(e.target.value));
    }
  },
  mounted() {
    this.getCountries();
  }
};
</script>