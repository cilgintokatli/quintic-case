<template>
  <div class="header">
    <div class="header-container">
      <nav>
        <div class="project-title">Quintic test case</div>

        <div class="menu-items">
          <SearchBox></SearchBox>
          <ul>
            <li v-for="menuItem in menuItems" :key="menuItem.path">
              <NuxtLink :to="menuItem.path">{{ menuItem.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <button
          aria-label="Menü"
          @click="isMenuOpen = !isMenuOpen"
          class="mobile-menu-button"
        >
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#4A5568"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </nav>
      <transition name="slide">
        <LazyMobileMenu
          :menuItems="menuItems"
          v-if="isMenuOpen"
        ></LazyMobileMenu>
      </transition>
    </div>
  </div>
</template>

<script>
import MobileMenu from "./MobileMenu.vue";
import SearchBox from "./SearchBox.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      isMenuOpen: false,
      menuItems: [
        { path: "/", label: "Home page" },
        { path: "/character", label: "Characters" },
      ],
    };
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style lang="scss">
.header {
  position: relative;

  .header-container {
    padding: 20px 50px;
    box-shadow: 0 1px 8px #ddd;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .project-title {
      font-size: 2vw;
      font-weight: 600;
      @media (max-width: $layout-breakpoint) {
        font-size: 5vw;
      }
    }
    .mobile-menu-button {
      display: none;
      @media (max-width: $layout-breakpoint) {
        display: block;
      }
    }
    .menu-items {
      display: flex;
      align-items: center;
      @media (max-width: $layout-breakpoint) {
        display: none;
      }
      ul {
        li {
          list-style: none;
          display: inline-block;
          padding: 0 20px;
        }
      }
    }
  }
}

.nuxt-link-exact-active {
  color: green;
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 2px;
}

.slide-enter-active,
.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  transition-property: max-height;
}

.slide-enter-to,
.slide-leave {
  max-height: 400px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
