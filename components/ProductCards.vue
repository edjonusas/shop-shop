<template>
  <div class="product-block">
    <product-card
      v-for="product in products"
      :key="product._id"
      :product="product"
      :wishlist="wishlist"
    />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
export default {
  name: "ProductCards",
  props: {
    products: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      wishlist: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.product-block {
  display: flex;
  flex-wrap: wrap;
  gap: 23px;
}

@media only screen and (max-width: 575px) {
  .product-block {
    gap: 5%;
  }
}
</style>
