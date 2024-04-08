<template>
  <div>
    <div class="container">
      <TheHeader />
      <Nuxt keep-alive />
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";

export default {
  mounted() {
    if (process.client) {
      this.$speedInsights();
    }
  },
};
</script>

<style lang="scss">
html,
body {
  min-height: 100%;
}
body {
  height: 100vh;
}
.container {
  width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 30px;

  @media (max-width: $layout-breakpoint) {
    width: 100%;
    max-width: 100%;
    padding: 0 10px;
    margin: 0px;
  }
}
</style>
