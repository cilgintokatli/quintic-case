<template>
  <div class="character-container">
    <CharacterItem
      v-for="character in characters"
      :character="character"
      :key="character._id"
    ></CharacterItem>
  </div>
</template>

<script>
import CharacterItem from "../CharacterItem.vue";

export default {
  name: "CharacterList",
  props: {
    characters: {
      type: Array,
      required: true,
    },
  },
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
