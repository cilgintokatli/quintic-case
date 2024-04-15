export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "quintic-case",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  target: "server",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ["~/components"],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/postcss8"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
  ],
  styleResources: {
    // your settings here
    sass: [],
    scss: ["./assets/css/vars/*.scss"],
    less: [],
    stylus: [],
    hoistUseStatements: true, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  publicRuntimeConfig: {
    oneApiBaseURL: process.env.ONE_API_BASE_URL || "https://the-one-api.dev/v2",
    oneApiSecret: process.env.ONE_API_TOKEN,
    tmdbApiKey: process.env.TMDB_API_KEY,
    tmdbApiAccessToken: process.env.TMDB_API_ACCES_TOKEN,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
