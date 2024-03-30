<template>
  <div class="flex text-xl items-baseline">
    <h2>Search Results:</h2>
    <div v-if="result">
      <nuxt-link
        :to="`${searchTerm}/${result._id}`"
        class="underline font-bold"
        >{{ result.name }}</nuxt-link
      >
    </div>
    <p v-else>No results</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      fetchingResults: false,
      searchTerm: null,
    };
  },
  created() {
    this.search();
  },
  watch: {
    $route() {
      // Başka sayfadan arama yaparken re-triggerlamak gerekiyor
      this.search();
    },
  },
  methods: {
    async search() {
      const { q: query, endpoint } = this.$route.query;
      this.searchTerm = endpoint;

      if (query && endpoint) {
        try {
          const apiUrl = `${
            this.$config.oneApiBaseURL
          }/${endpoint}?name=${encodeURIComponent(query)}`;

          const response = await this.$axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${this.$config.oneApiSecret}`,
            },
          });
          this.result = response.data.docs[0];
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          this.fetchingResults = false;
        }
      }
    },
  },
};
</script>
