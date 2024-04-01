<template>
  <div>
    <MovieDetail :movie="movie" v-if="movie"></MovieDetail>
    <div class="flex flex-row gap-5 md:gap-20 max-w-2xl m-auto" v-else>
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
    </div>
  </div>
</template>

<script>
import SkeletonCard from "../../components/SkeletonCard.vue";
import MovieDetail from "../../components/movie/detail/MovieDetail.vue";

export default {
  head() {
    return {
      title: "Movie Detail Page",
    };
  },
  async created() {
    if (this.allMoviesFetched) {
      await this.fetchMovie();
    }
  },
  computed: {
    movie() {
      const movieId = this.$route.params.id;
      return (
        this.$store.state.movies.movies.find(
          (movie) => movie._id === movieId
        ) || null
      );
    },
    isStoreEmpty() {
      return this.$store.state.movies.movies.length === 0;
    },
    allMoviesFetched() {
      return this.$store.state.movies.allMoviesFetched === false;
    },
  },
  methods: {
    async fetchMovie() {
      if (!this.movie) {
        await this.$store.dispatch("movies/fetchSingleMovie", {
          $config: this.$config,
          movieID: this.$route.params.id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
