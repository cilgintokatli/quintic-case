<template>
  <div class="character-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CharacterList",
};
</script>

<style lang="scss" scoped>
.character-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 50px 10px;
  justify-items: center;
  @media (max-width: $layout-breakpoint) {
    grid-template-columns: 1fr;
  }
}
</style>
