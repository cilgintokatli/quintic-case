<template>
  <div class="header">
    <div class="header-container">
      <nav>
        <div class="project-title">Quintic test case</div>

        <ul>
          <SearchBox></SearchBox>
          <li v-for="menuItem in menuItems" :key="menuItem.path">
            <NuxtLink :to="menuItem.path">{{ menuItem.label }}</NuxtLink>
          </li>
        </ul>
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
      <div
        :class="isMenuOpen ? 'block' : 'hidden'"
        class="mobile-menu w-full mt-10 grid"
      >
        <SearchBox></SearchBox>
        <nav>
          <ul>
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.path"
              @click="isMenuOpen = !isMenuOpen"
            >
              <NuxtLink :to="menuItem.path">{{ menuItem.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
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
    ul {
      display: flex;
      align-items: center;
      @media (max-width: $layout-breakpoint) {
        display: none;
      }

      li {
        list-style: none;
        display: inline-block;
        padding: 0 20px;
      }
    }
  }
  .mobile-menu {
    gap: 10px;
    nav {
      justify-content: center;

      ul {
        display: block;
        li {
          display: block;
          margin-top: 10px;
          font-size: 6vw;
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
</style>
