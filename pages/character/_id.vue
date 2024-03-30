<template>
  <div class="flex flex-col items-center">
    <CharacterCard :character="character" />
    <button
      @click="loadMoreQuotes"
      class="border border-black rounded-md px-5 py-3 hover:bg-gray-100"
      :disabled="allQuotesLoaded"
      :class="allQuotesLoaded ? 'ring-2 ring-red-400 ' : 'ring-2 ring-gray-400'"
    >
      {{ buttonText }}
    </button>
    <div v-if="quotes.length">
      <ul>
        <li
          v-for="quote in displayedQuotes"
          :key="quote._id"
          class="py-10 my-5 max-w-lg"
        >
          <blockquote
            class="text-xl italic text-right font-semibold text-gray-900"
          >
            <svg
              class="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path
                d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
              />
            </svg>
            {{ quote.dialog }}
          </blockquote>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
      isFirstClick: true,
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
        } else if (this.isFirstClick) {
          this.buttonText = "Load More Quotes";
          this.isFirstClick = false;
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
