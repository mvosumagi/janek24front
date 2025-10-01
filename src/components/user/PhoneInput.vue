<template>

        <div class="mb-3">
<!--          <label>Phone number</label>-->
          <div style="display:flex; gap:6px; align-items:center;">
            <select
                :value="selectedDial"
                @change="onDialChange">
              <option v-for="c in countries" :key="c.dial" :value="c.dial">
                {{ c.flag }} ({{ c.dial }})
              </option>
            </select>
            <input
                :value="localNumber"
                @change="onLocalNumberChange"
                type="text"
                class="form-control"
                placeholder="Number"
                style="flex:1;"
            />
          </div>
        </div>

</template>
<script>
export default {
  name: "PhoneInput",
  props: {phone: String},
  data() {
    return {
      countries: [
        {code: "EE", label: "Estonia", dial: "+372", flag: "🇪🇪"},
        {code: "LV", label: "Latvia", dial: "+371", flag: "🇱🇻"},
        {code: "LT", label: "Lithuania", dial: "+370", flag: "🇱🇹"},
        {code: "FI", label: "Finland", dial: "+358", flag: "🇫🇮"},
        {code: "SE", label: "Sweden", dial: "+46", flag: "🇸🇪"},
        {code: "DE", label: "Germany", dial: "+49", flag: "🇩🇪"},
        {code: "FR", label: "France", dial: "+33", flag: "🇫🇷"},
        {code: "GB", label: "UK", dial: "+44", flag: "🇬🇧"},
        {code: "US", label: "USA", dial: "+1", flag: "🇺🇸"},
        {code: "IN", label: "India", dial: "+91", flag: "🇮🇳"}
      ],
      selectedDial: "+372",
      localNumber: ""
    };
  },
  mounted() {
    if (this.phone && this.phone.startsWith("+")) {
      const match = this.countries.find(c => this.phone.startsWith(c.dial));
      if (match) {
        this.selectedDial = match.dial;
        this.localNumber = this.phone.slice(match.dial.length);
      } else {
        this.localNumber = this.phone;
      }
    } else if (this.phone) {
      this.localNumber = this.phone;
    }
  },
  methods: {
    emitCombined() {
      const value = this.localNumber ? `${this.selectedDial}${this.localNumber}` : "";
      this.$emit("event-phone-updated", value);
    },
    onDialChange(e) {
      this.selectedDial = e.target.value;
      this.emitCombined();
    },
    onLocalNumberChange(e) {
      this.localNumber = String(e.target.value).replace(/\s+/g, "");
      this.emitCombined();
    }
  }
};
</script>
