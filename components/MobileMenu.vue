<template>
  <div class="mobile-menu w-full mt-10 grid">
    <SearchBox></SearchBox>
    <nav>
      <ul>
        <li v-for="menuItem in menuItems" :key="menuItem.path">
          <NuxtLink :to="menuItem.path">{{ menuItem.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
