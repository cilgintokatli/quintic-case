<template>
  <div
    class="flex items-center justify-center p-5 w-full rounded-lg border border-black shadow-sm"
  >
    <nuxt-link :to="`/character/${character._id}`">
      <CharacterCard :character="character"></CharacterCard>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
