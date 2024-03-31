<template>
  <div class="movie-item-container">
    <nuxt-link :to="`/movie/${movie._id}`">
      <div class="movie-item">
        <img v-if="movie.imageUrl" :src="movie.imageUrl" alt="" />
        <div class="movie-title">
          <h2>{{ movie.name }}</h2>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.movie-item-container {
  position: relative;
  &:nth-of-type(odd) {
    background: green;
  }
  &:nth-of-type(even) {
    background: black;
  }
}
.movie-item {
  position: static;
  overflow: hidden;

  &:hover {
    img {
      opacity: 1;
      transform: scale(1);
    }
  }

  .movie-title {
    position: absolute;
    bottom: 0px;
    color: white;
    font-size: 3.5vw;
    text-align: right;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: end;
    padding: 20px;
    @media (max-width: $layout-breakpoint) {
      font-size: 6vw;
    }
  }

  img {
    opacity: 0;
    height: 400px;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    object-fit: cover;
    transition: all 0.6s;
    transform: scale(1.2);
  }
}
</style>
