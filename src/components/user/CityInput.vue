<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-4">
        <div class="mb-3">
          <label class="col-4 text-start">City</label>
          <select
              :value="cityId"
              @change="onSelect"
              class="form-select"
              :disabled="!countryId || loading || error"
          >
            <option disabled value="">-- Select city --</option>
            <option v-for="c in cities" :key="c.id" :value="c.id">
              {{ c.name }}
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

export default {
  name: "CityInput",
  props: {
    countryId: { type: [Number, String], default: "" },
    cityId: { type: [Number, String], default: "" }
  },
  data() {
    return { cities: [], loading: false, error: false };
  },
  watch: {
    countryId: {
      immediate: true,
      async handler(newVal) {
        this.cities = [];
        if (!newVal) return;
        this.loading = true;
        this.error = false;
        try {
          const id = Number(newVal);
          this.cities = await CityService.listByCountry(id);
        } catch (e) {
          console.error("Failed to load cities", e);
          this.error = true;
        } finally {
          this.loading = false;
        }
      }
    }
  },
  methods: {
    onSelect(e) {
      const id = e.target.value === "" ? "" : Number(e.target.value);
      this.$emit("event-city-updated", id);
    }
  }
};
</script>
