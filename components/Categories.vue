<template>
  <div>
    <div class="d-flex">
      <div class="left">
        <h6>Categories</h6>
        <ul v-for="(item, index) in categories" :key="index">
          <li>
            <nuxt-link :to="`/products/` + item + `/` + 1">
              {{item.toString() }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",

  // fetch({ store }) {
  //   return store.dispatch("getCategories");
  // },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    }
  },
  mounted() {
    console.log(this.categories)
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/sass/main"

*
  font-family: $mainFont

h6
  font-weight: 600 !important

ul
  padding: 0

ul li
  list-style-type: none

a
  text-decoration: none
  color: #666
  cursor: pointer
  font-size: 14px

a:hover
  color: #3E9E92

.left
  margin-right: 40px
</style>
