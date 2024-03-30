<template>
  <div class="character_item">
    <div class="flex flex-col md:flex-row items-center w-full max-w-sm">
      <img
        v-if="character.modifiedImageUrl"
        :src="character.modifiedImageUrl"
        :alt="character.name"
        class="aspect-square w-full md:w-[100px] rounded-lg overflow-hidden h-full object-cover"
      />
      <div class="p-5 grid gap-2">
        <h3 class="text-lg font-medium leading-none">
          {{ character.name }}
        </h3>
        <ul class="flex flex-col gap-1 text-sm">
          <li v-if="character.height">
            <span class="font-semibold">Height:</span> {{ character.height }}
          </li>
          <li v-if="character.race">
            <span class="font-semibold">Race:</span> {{ character.race }}
          </li>
          <li v-if="character.gender">
            <span class="font-semibold">Gender:</span> {{ character.gender }}
          </li>
          <li v-if="character.birth">
            <span class="font-semibold">Birth:</span> {{ character.birth }}
          </li>
          <li v-if="character.spouse">
            <span class="font-semibold">Spouse:</span> {{ character.spouse }}
          </li>
          <li v-if="character.death">
            <span class="font-semibold">Death:</span> {{ character.death }}
          </li>
          <li v-if="character.realm">
            <span class="font-semibold">Realm:</span> {{ character.realm }}
          </li>
          <li v-if="character.hair">
            <span class="font-semibold">Hair:</span> {{ character.hair }}
          </li>
        </ul>
      </div>
    </div>
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
