<template>
  <div>
    <MovieList :movies="movies"></MovieList>
  </div>
</template>

<script>
import MovieList from "../components/views/MovieList.vue";

export default {
  name: "IndexPage",
  head() {
    return {
      title: "Home Page",
    };
  },
  computed: {
    movies() {
      return this.$store.getters["movies/getMovies"];
    },
  },
  async created() {
    await this.$store.dispatch("movies/fetchInitialMovies", this.$config);
  },
};
</script>
