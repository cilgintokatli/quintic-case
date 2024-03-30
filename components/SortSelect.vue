<template>
  <select
    v-model="selectedSort"
    @change="handleChange"
    class="border border-black bg-gray-100 py-2 px-4 rounded-md"
    aria-label="Sort By"
  >
    <option value="">Sort By</option>
    <option value="asc">Name (Ascending)</option>
    <option value="desc">Name (Descending)</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectedSort: "",
    };
  },
  methods: {
    handleChange() {
      this.$emit("sort-change", this.selectedSort);
    },
  },
};
</script>
