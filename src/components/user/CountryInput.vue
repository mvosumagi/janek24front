<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label class="col-4 text-start">Country</label>
          <select
              :value="countryId"
              @change="onSelect"
              class="form-select"
          >
            <option disabled value="">-- Select country --</option>
            <option v-for="c in countries" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
          <small v-if="loading">Loading countries…</small>
          <small v-if="error" class="text-danger">Failed to load countries</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryService from "@/services/CountryService";

export default {
  name: "CountryInput",
  props: {
    countryId: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      countries: [],
      loading: false,
      error: false
    };
  },
  methods: {
    async fetchCountries() {
      this.loading = true;
      this.error = false;
      try {
        this.countries = await CountryService.getCountries();
      } catch (e) {
        console.error("Failed to load countries", e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    onSelect(e) {
      const id = e.target.value === "" ? "" : Number(e.target.value);
      this.$emit("event-country-updated", id);
    }
  },
  mounted() {
    this.fetchCountries();
  }
};
</script>







<!--<template>-->
<!--  <div class="container text-center">-->
<!--    <div class="row justify-content-center">-->
<!--      <div class="col col-4">-->
<!--        <div class="mb-3">-->
<!--          <label>Country </label>-->
<!--          <input :value="country" @input="handleCountryInput" type="text" placeholder="Country"/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "CountryInput",-->
<!--  props: {-->
<!--    country: String-->
<!--  },-->
<!--  methods: {-->

<!--    handleCountryInput(event) {-->
<!--      this.$emit("event-country-updated", String(event.target.value))-->
<!--    }-->
<!--  }-->


<!--}-->
<!--</script>-->
