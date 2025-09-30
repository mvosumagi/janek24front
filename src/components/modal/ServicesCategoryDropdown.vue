<!--<template>
  <select :value="selectedServiceCategoryId" @change="handleServiceCategoryDropdownChange" class="form-select">
    <option selected :value="0">All Services</option>
    <option v-for="serviceCategory in servicesCategory" :key="serviceCategory.serviceCategoryId" :value="serviceCategory.serviceCategoryId">{{ serviceCategory.serviceCategoryName }}</option>
  </select>
</template>
<script>
export default {
  name: 'ServicesCategoryDropdown',
  props: {
    servicesCategory: Array,
    selectedServiceCategoryId: {
      type: Number,
      default: 0
    }
  },
  methods: {

    handleServiceCategoryDropdownChange(event) {
      this.$emit('event-new-service-category-selected', Number(event.target.value))
    },

  }
}
</script>-->



<template>
  <select @change="onSelect($event)" class="form-select">
    <option v-for="category in servicesCategory" :key="category.serviceCategoryId" :value="category.serviceCategoryId">
      {{ category.serviceCategoryName }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    servicesCategory: Array,
    selectedServiceCategoryId: Number
  },
  methods: {
    onSelect(event) {
      const selectedId = Number(event.target.value);
      this.$emit('event-new-service-category.selected', selectedId);
    }
  }
}
</script>


