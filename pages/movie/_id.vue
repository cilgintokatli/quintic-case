<template>
  <div>
    <div v-if="isStoreEmpty">
      <div class="grid grid-cols-2 gap-10 max-w-2xl m-auto">
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </div>
    </div>
    <div v-else-if="movie">
      <div class="flex flex-row items-center justify-center gap-5 md:gap-20">
        <div v-if="movie.imageUrl">
          <img :src="movie.imageUrl" :alt="movie.name" />
        </div>
        <div>
          <h1 class="text-3xl">{{ movie.name }}</h1>
          <div class="[&>*:last-child]:border-b-2 border-gray-400">
            <div
              v-for="(value, key, index) in movie"
              :key="index"
              v-if="index !== 8 && index !== 0 && index !== 1"
              class="border-t-2 border-gray-400"
            >
              {{ key.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase() }}:
              {{ value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Movie not found</p>
    </div>
  </div>
</template>

<script>
import SkeletonCard from "../../components/SkeletonCard.vue";

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
      return Object.keys(this.$store.state.movies.movies).length === 0;
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
