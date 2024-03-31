<template>
  <div>
    <MovieDetail :movie="movie"></MovieDetail>
  </div>
</template>

<script>
import MovieDetail from "../../components/movie/detail/MovieDetail.vue";

export default {
  head() {
    return {
      title: "Movie Detail Page",
    };
  },
  async asyncData({ params, $axios, $config }) {
    const res = await $axios.$get(
      `${$config.oneApiBaseURL}/movie/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${$config.oneApiSecret}`,
        },
      }
    );

    const movie = res?.docs[0] || null;
    return { movie };
  },
};
</script>

<style lang="scss" scoped></style>
