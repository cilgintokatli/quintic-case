<template>
  <div>
    <!-- <div class="grid grid-cols-2 gap-10 max-w-2xl m-auto"> -->
    <div
      class="flex flex-row items-center justify-center gap-5 md:gap-20"
      v-if="isStoreEmpty"
    >
      <SkeletonCard></SkeletonCard>
      <SkeletonCard></SkeletonCard>
    </div>
    <div v-else-if="movie">
      <LazyMovieDetail :movie="movie"></LazyMovieDetail>
    </div>
    <div v-else>
      <p>Movie not found</p>
    </div>
  </div>
</template>

<script>
import SkeletonCard from "../../components/SkeletonCard.vue";
import MovieDetail from "../../components/movie/detail/MovieDetail.vue";

export default {
  head() {
    return {
      title: this.movie ? this.movie.name : "movie detail page",
    };
  },
  computed: {
    movie() {
      return this.$store.getters["movies/getMovieById"](this.$route.params.id);
    },
    isStoreEmpty() {
      return this.$store.state.movies.movies.length === 0;
    },
  },
  async created() {
    // Eğer store boş ise fetchle
    if (this.isStoreEmpty) {
      await this.$store.dispatch("movies/fetchInitialMovies", this.$config);
    }
  },
};
</script>

<style lang="scss" scoped></style>
