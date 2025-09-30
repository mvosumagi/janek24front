<template>
        <div class="mb-3">
<!--          <label class="col-4 text-start">Country</label>-->
          <select
              :value="countryId"
              @change="handleCountryDropdownChange"
              class="form-select">
            <option disabled
                    :value="0">-- Select country --</option>
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
  countryName: "CountryDropdown",
  props: {
    countryId: Number
  },
  data() {
    return {
      countries: [
        {
          countryId: 0,
          countryName: ""
        }
      ],
      loading: false,
      error: false
    };
  },
  methods: {
    getCountries() {
      this.loading = true;
      this.error = false;
      CountryService.getCountries()
          .then(response => this.countries = response.data)
          .catch(() => NavigationService.navigateToErrorView())
          .finally(() => this.loading = false)
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