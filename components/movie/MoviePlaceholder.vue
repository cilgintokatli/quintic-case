<template>
  <div
    role="status"
    class="w-full flex flex-col justify-end place-items-end p-4 animate-pulse"
    v-if="isMobile"
  >
    <div class="h-5 w-full bg-gray-200 rounded-full mb-2.5"></div>
  </div>
  <div
    class="w-full flex flex-col justify-end place-items-end p-4 animate-pulse"
    v-else
  >
    <div class="h-2.5 w-32 bg-gray-200 rounded-full mb-2"></div>
    <div class="h-3 w-48 bg-gray-200 rounded-full mb-2"></div>
    <div class="h-5 w-full bg-gray-200 rounded-full mb-2.5"></div>
    <div class="h-5 w-full bg-gray-200 rounded-full mb-2.5"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: true, // Initialize as false
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 700; // Adjust breakpoint
  },
  // computed: {
  //   isMobileScreen() {
  //     const screenSize = window.matchMedia("(max-width: 700px)");
  //     if (screenSize.matches) {
  //       // If media query matches

  //       console.log("mobile true");
  //       return true;
  //     } else {
  //       console.log("mobile false");
  //       return false;
  //     }
  //   },
  // },
  // created() {
  //   if (process.client) {
  //     console.log("isMobileScreen", this.isMobileScreen);
  //     this.isMobile = this.isMobileScreen;
  //   }
  // },
};
</script>

<style lang="scss" scoped></style>
