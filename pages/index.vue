<template>
  <div>
    <LazyMovieList v-if="isLoading">
      <LazyMoviePlaceholder
        v-for="index in 6"
        :key="index"
        class="placeholder"
      ></LazyMoviePlaceholder>
    </LazyMovieList>
    <LazyMovieList v-else-if="movies">
      <LazyMovieItem v-for="movie in movies" :key="movie._id" :movie="movie" />
    </LazyMovieList>
  </div>
</template>

<script>
import SkeletonCard from "../components/SkeletonCard.vue";
import MovieItem from "../components/movie/MovieItem.vue";
import MovieList from "../components/movie/MovieList.vue";
import MoviePlaceholder from "../components/movie/MoviePlaceholder.vue";

export default {
  name: "IndexPage",
  head() {
    return {
      title: "Home Page",
    };
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    movies() {
      return this.$store.getters["movies/getMovies"];
    },
    isStoreEmpty() {
      return this.$store.state.movies.movies.length === 0;
    },
  },
  async created() {
    if (this.isStoreEmpty) {
      await this.$store.dispatch("movies/fetchInitialMovies", {
        $config: this.$config,
      });
    }
  },
};
</script>

<style>
.placeholder:nth-child(even) {
  background: black;
}
.placeholder:nth-child(odd) {
  background: green;
}
</style>
