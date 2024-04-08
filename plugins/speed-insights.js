import { injectSpeedInsights } from "@vercel/speed-insights";

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("speedInsights", () => {
    injectSpeedInsights;
  });
};
