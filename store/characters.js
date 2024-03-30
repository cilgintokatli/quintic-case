export const state = () => ({
  characters: [],
  currentPage: 1,
  totalPages: 1,
  limit: 10,
});

export const mutations = {
  SET_CHARACTERS(state, characters) {
    state.characters = characters;
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },

  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  SET_LIMIT(state, limit) {
    state.limit = limit;
  },
};

export const actions = {
  async fetchCharacters({ commit, state }, { $config, page, sort }) {
    try {
      let apiUrl = `${$config.oneApiBaseURL}/character?limit=${state.limit}&page=${page}`;

      if (sort) {
        apiUrl += `&sort=name:${sort}`;
      }

      const response = await this.$axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${$config.oneApiSecret}`,
        },
      });

      const fetchCharacterImages = await Promise.all(
        response.data.docs.map(async (character) => {
          try {
            const imageUrlResponse = await this.$axios.get(
              `https://lotr.fandom.com/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${character.name}&origin=*`
            );
            const pages = imageUrlResponse.data.query.pages;
            const page = Object.values(pages)[0];
            const imageUrl = page?.original?.source || null;

            const modifiedImageUrl = imageUrl
              ? imageUrl.replace(/\/revision\/latest\?cb=\d+/, "")
              : null;

            return { ...character, modifiedImageUrl };
          } catch (error) {
            return character;
          }
        })
      );
      commit("SET_CHARACTERS", fetchCharacterImages);
      commit("SET_CURRENT_PAGE", page);
      commit("SET_TOTAL_PAGES", response.data.pages);
    } catch (error) {
      console.error("Error fetching characters data:", error);
    }
  },
};

export const getters = {
  getCharacters: (state) => state.characters,
};
