<template>
  <div>
    <div class="movie-container">
      <MovieItem v-for="movie in movies" :key="movie._id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieItem from "../MovieItem.vue";

export default {
  name: "MovieList",
  props: ["movies"],
};
</script>

<style lang="scss" scoped>
.movie-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 400px;
  gap: 50px 30px;
}
</style>
