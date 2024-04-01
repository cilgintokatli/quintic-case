export const state = () => ({
  movies: [],
  allMoviesFetched: false,
});

export const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies;
  },

  ADD_MOVIE(state, movie) {
    state.movies.push(movie);
  },

  SET_ALL_MOVIES_FETCHED(state, value) {
    state.allMoviesFetched = value;
  },
};

export const actions = {
  async fetchInitialMovies({ commit }, { $config }) {
    try {
      this.$axios.setToken($config.oneApiSecret, "Bearer");

      // one api movie endpointi için fetch isteği

      const response = await this.$axios.get(`${$config.oneApiBaseURL}/movie/`);

      // her movie elemanına film afişi eklemek için TMBD API'ya paralel async fetch isteği
      const moviesWithImages = await Promise.all(
        response.data.docs.map(async (movie) => {
          const imageUrl = await this.$axios
            .get(`https://api.themoviedb.org/3/search/movie`, {
              params: {
                query: movie.name,
              },
              headers: {
                Authorization: `Bearer ${$config.tmdbApiAccessToken}`,
              },
            })
            .then((response) => {
              const posterPath = response.data.results[0]?.poster_path;
              if (posterPath) {
                return `https://image.tmdb.org/t/p/w300${posterPath}`;
              } else {
                return null;
              }
            })
            .catch((error) => {
              console.error(
                "tmdb api film afişi fetchlerken bir hata oldu:",
                error
              );
              return null;
            });

          return { ...movie, imageUrl };
        })
      );
      commit("SET_MOVIES", moviesWithImages);
    } catch (error) {
      console.error("fetchlerken bir hata oldu:", error);
    }
  },
  async fetchSingleMovie({ commit }, { $config, movieID }) {
    try {
      const response = await this.$axios.$get(
        `${$config.oneApiBaseURL}/movie/${movieID}`,
        {
          headers: {
            Authorization: `Bearer ${$config.oneApiSecret}`,
          },
        }
      );

      const movie = response.docs[0];

      const imageUrl = await this.$axios
        .get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            query: movie.name,
          },
          headers: {
            Authorization: `Bearer ${this.$config.tmdbApiAccessToken}`,
          },
        })
        .then((response) => {
          const posterPath = response.data.results[0]?.poster_path;
          if (posterPath) {
            return `https://image.tmdb.org/t/p/w300${posterPath}`;
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.error(
            "tmdb api film afişi fetchlerken bir hata oldu:",
            error
          );
          return null;
        });

      const movieWithImage = { ...movie, imageUrl };

      // Commit the movie to the store
      commit("ADD_MOVIE", movieWithImage);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  },
};

export const getters = {
  getMovies: (state) => state.movies,
  getMovieById: (state) => (id) => {
    return state.movies.find((movie) => movie._id === id);
  },
  getSingleMovie: (state) => state.singleMovie,
  getSingleMovieById: (state) => (id) => {
    return state.singleMovie.find((movie) => movie._id === id);
  },
};
