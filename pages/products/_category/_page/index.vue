<template>
  <div>
    <div class="container">
      <div class="d-flex">
        <div class="left">
          <h6>Categories</h6>
          <ul v-for="(product, index) in IndexProducts" :key="index">
            <li>
              <nuxt-link :to="`/products/` + product.category + `/` + 1">{{
                product.category.toString()
              }}</nuxt-link>
            </li>
          </ul>

        </div>
        <div class="right">
          <ProductCard :product="prod" :wishlist="true" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";

export default {
  name: "Index",
  components: {
    ProductCard
  },
  data() {
    return {
      prod: null
    };
  },
  fetch({ store }) {
    return store.dispatch("getIndexProducts");
  },
  computed: {
    IndexProducts() {
      for (let i = 0; i < this.$store.getters.getProducts.length; i++) {
        console.log(this.$store.getters.getProducts[i].category);
        if (
          this.$store.getters.getProducts[i].category ===
            this.$route.params.category
        ) {
          this.prod = this.$store.getters.getProducts[i];
        }
      }
      return this.$store.getters.getProducts;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../../../../assets/sass/main"

*
  font-family: $mainFont

h6
  font-size: 24px

ul
  padding: 0

ul li
  list-style-type: none

a
  text-decoration: none
  color: #000
  cursor: pointer
  font-size: 14px

a:hover
  color: #3E9E92

.container
  margin-top: 50px

.left
  margin-right: 40px

@media  (max-width: 700px)
  .d-flex
    flex-direction: column
</style>
