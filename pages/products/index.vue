<template>
  <div>
    <div class="container">
      <div class="d-flex">
        <div class="categories">
          <Categories />
          <SidebarProducts :products="IndexProducts"/>

          <FilterByPrice />
        </div>
        <div class="product-cards">
          <product-cards :products="IndexProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarProducts from "~/components/SidebarProducts";
export default {
  name: "index",
  components: {SidebarProducts},
  async asyncData({ store }) {},
  computed: {
    IndexProducts() {
      return this.$store.getters.getProducts;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../../assets/sass/main"

*
  font-family: $mainFont

.container
  padding: 0
  margin-top: 50px

.categories
  padding-right: 20px



.product-cards
  padding-right: 15px
  padding-left: 15px

@media  (max-width: 700px)

  .d-flex
    flex-direction: column

  .container
    padding-left: 15px
    padding-right: 15px

  .product-cards
    order: 1
</style>
