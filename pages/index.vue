<template>
  <div>
    <LazyMovieList v-if="isStoreEmpty">
      <LazySkeletonCard v-for="index in 6" :key="index"></LazySkeletonCard>
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
      await this.$store.dispatch("movies/fetchInitialMovies", this.$config);
    }
  },
};
</script>
