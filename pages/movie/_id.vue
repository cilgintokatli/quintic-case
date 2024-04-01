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
        await this.$store.dispatch("movies/fetchInitialMovies", {
          $config: this.$config,
          movieID: this.$route.params.id,
        });
      }

      // if (!this.movie) {
      //   try {
      //     const movieId = this.$route.params.id;
      //     const response = await this.$axios.$get(
      //       `${this.$config.oneApiBaseURL}/movie/${movieId}`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${this.$config.oneApiSecret}`,
      //         },
      //       }
      //     );

      //     const movie = response.docs[0];

      //     const imageUrl = await this.$axios
      //       .get(`https://api.themoviedb.org/3/search/movie`, {
      //         params: {
      //           query: movie.name,
      //         },
      //         headers: {
      //           Authorization: `Bearer ${this.$config.tmdbApiAccessToken}`,
      //         },
      //       })
      //       .then((response) => {
      //         const posterPath = response.data.results[0]?.poster_path;
      //         if (posterPath) {
      //           return `https://image.tmdb.org/t/p/w300${posterPath}`;
      //         } else {
      //           return null;
      //         }
      //       })
      //       .catch((error) => {
      //         console.error(
      //           "tmdb api film afişi fetchlerken bir hata oldu:",
      //           error
      //         );
      //         return null;
      //       });

      //     const movieWithImage = { ...movie, imageUrl };

      //     this.$store.commit("movies/ADD_MOVIE", movieWithImage);
      //   } catch (error) {
      //     console.error("Error fetching movie:", error);
      //   }
      // }
    },
  },
};
</script>

<style lang="scss" scoped></style>
