<template>
  <div>
    <LazyMovieList v-if="isStoreEmpty">
      <LazyMoviePlaceholder
        v-for="index in 6"
        :key="index"
        class="placeholder"
      ></LazyMoviePlaceholder>
    </LazyMovieList>
    <LazyMovieList v-else-if="movies">
      <LazyMovieItem
        v-for="(movie, index) in movies"
        :key="movie._id"
        :movie="movie"
        :index="index"
      />
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
      description: "Home Page for quintic case",
    };
  },
  computed: {
    movies() {
      return this.$store.getters["movies/getMovies"];
    },
    isStoreEmpty() {
      return this.$store.state.movies.movies.length === 0;
    },
    allMoviesFetched() {
      return this.$store.state.movies.allMoviesFetched === false;
    },
  },
  async created() {
    if (this.allMoviesFetched) {
      await this.$store.dispatch("movies/fetchInitialMovies", {
        $config: this.$config,
      });
      this.$store.commit("movies/SET_ALL_MOVIES_FETCHED", true);
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
