<template>
  <div>
    <div class="movie-container">
      <!-- <MovieItem v-for="movie in movies" :key="movie._id" :movie="movie" /> -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",
};
</script>

<style lang="scss" scoped>
.movie-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 400px;
  gap: 50px 30px;
  margin-bottom: 2rem;

  @media (max-width: $layout-breakpoint) {
    grid-template-columns: 1fr;
  }
}
</style>
