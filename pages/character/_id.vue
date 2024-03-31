<template>
  <div class="flex flex-col items-center">
    <CharacterCard :character="character" />

    <button
      @click="loadMoreQuotes"
      class="border border-black rounded-md px-5 py-3 hover:bg-gray-100 min-w-52 cursor-pointer"
      :disabled="allQuotesLoaded"
      :class="allQuotesLoaded ? 'ring-2 ring-red-400 ' : 'ring-2 ring-gray-400'"
    >
      {{ buttonText }}
    </button>
    <div v-if="quotes.length">
      <ul>
        <QuoteBlok
          v-for="quote in displayedQuotes"
          :key="quote._id"
          :quote="quote"
        ></QuoteBlok>
      </ul>
    </div>
  </div>
</template>

<script>
import CharacterCard from "../../components/character/CharacterCard.vue";

export default {
  components: {
    QuoteBlok: () => import("../../components/character/detail/QuoteBlok.vue"),
  },
  head() {
    return {
      title: this.character ? this.character.name : "Character",
    };
  },
  data() {
    return {
      character: null,
      quotes: [],
      allQuotesLoaded: false,
      limit: 5,
      offset: 0,
      buttonText: "Load Quotes",
      isFirstLoad: true,
    };
  },
  methods: {
    async loadMoreQuotes() {
      try {
        const params = this.$route.params;
        const quotesResponse = await this.$axios.$get(
          `${this.$config.oneApiBaseURL}/character/${params.id}/quote?limit=${this.limit}&offset=${this.offset}`,
          {
            headers: {
              Authorization: `Bearer ${this.$config.oneApiSecret}`,
            },
          }
        );

        const newQuotes = quotesResponse.docs || [];
        this.quotes = [...this.quotes, ...newQuotes];
        this.offset += this.limit;

        if (newQuotes.length < this.limit) {
          this.allQuotesLoaded = true;
          this.buttonText = "No quotes :(";
        } else if (this.isFirstLoad) {
          this.buttonText = "Load More Quotes";
          this.isFirstLoad = false;
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    },
  },
  computed: {
    displayedQuotes() {
      return this.quotes.reverse();
    },
  },
  async asyncData({ params, $axios, $config }) {
    try {
      const characterResponse = await $axios.$get(
        `${$config.oneApiBaseURL}/character/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${$config.oneApiSecret}`,
          },
        }
      );

      const character = characterResponse?.docs[0] || null;

      return { character };
    } catch (error) {
      console.error("Error fetching character data:", error);
      return { character: null };
    }
  },
};
</script>

<style lang="scss" scoped></style>
