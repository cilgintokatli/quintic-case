<template>
  <div
    class="searchbox grid gap-3 md:gap-0 grid-flow-row md:grid-flow-col items-center"
  >
    <input
      type="text"
      v-model="query"
      placeholder="Search movies or characters..."
      class="border border-black md:rounded-none md:rounded-l-md rounded-md px-5 py-2"
    />
    <select
      aria-label="Search By"
      v-model="selectedEndpoint"
      class="border border-black md:border-l-0 md:rounded-r-md md:rounded-none rounded-md bg-gray-100 h-full px-5 py-2"
    >
      <option value="movie">Movies</option>
      <option value="character">Characters</option>
    </select>
    <button
      aria-label="Search button"
      @click="search"
      class="md:ml-3 h-full px-4 py-3 md:py-0 bg-gray-100 border border-black rounded-md"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      selectedEndpoint: "movie",
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: "/search",
        query: { q: this.query, endpoint: this.selectedEndpoint },
      });
    },
  },
};
</script>
