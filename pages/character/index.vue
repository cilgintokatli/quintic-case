<template>
  <div class="h-fit">
    <div class="my-5 flex justify-between items-baseline">
      <h2 class="text-xl md:text-2xl">Characters</h2>
      <SortSelect @sort-change="handleSortChange"></SortSelect>
    </div>

    <!-- Display "Loading..." text if characters are still loading -->
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-12"
    >
      <div v-for="index in 6" :key="index">
        <SkeletonCard></SkeletonCard>
      </div>
    </div>

    <!-- Render character list if characters are loaded -->
    <CharacterList v-if="!loading" :characters="characters"></CharacterList>

    <div class="pagination flex items-center justify-center my-5 gap-5">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import SkeletonCard from "../../components/SkeletonCard.vue";
import SortSelect from "../../components/SortSelect.vue";
import CharacterList from "../../components/views/CharacterList.vue";

export default {
  head() {
    return {
      title: "Characters",
    };
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    characters() {
      return this.$store.getters["characters/getCharacters"];
    },
    currentPage() {
      return this.$store.state.characters.currentPage;
    },
    totalPages() {
      return this.$store.state.characters.totalPages;
    },
  },
  methods: {
    async prevPage() {
      await this.fetchCharacters(this.currentPage - 1);
    },
    async nextPage() {
      await this.fetchCharacters(this.currentPage + 1);
    },
    async fetchCharacters(page) {
      try {
        this.loading = true; // Set loading state to true
        await this.$store.dispatch("characters/fetchCharacters", {
          $config: this.$config,
          sort: this.selectedSort,
          page,
        });
      } finally {
        this.loading = false;
      }
    },
    handleSortChange(sort) {
      this.selectedSort = sort;
      this.fetchCharacters(this.currentPage);
    },
  },
  async created() {
    await this.fetchCharacters(1);
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  button {
    @apply bg-gray-100 border border-black px-3 py-2 rounded-md;
  }
}
</style>
