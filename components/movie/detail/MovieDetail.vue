<template>
  <div class="flex flex-row items-center justify-center gap-5 md:gap-20">
    <div v-if="movie.imageUrl">
      <img
        :src="movie.imageUrl"
        :alt="movie.name"
        rel="preload"
        width="300"
        height="450"
      />
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
</template>

<script>
export default {
  name: "MovieDetailItem",
  props: {
    movie: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped></style>
