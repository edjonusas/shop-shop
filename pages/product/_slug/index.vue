<template>
  <div>
    <ProductInfo :product="singleProduct" />
  </div>
</template>

<script>
import ProductInfo from "~/components/ProductInfo";
export default {
  name: "index",
  components: {
    ProductInfo,
  },
  fetch({ store, params }) {
    return store.dispatch("getFullProductInfo", params.slug);
  },
  computed: {
    singleProduct() {
      return this.$store.getters.getSingleProduct;
    },
  },
};
</script>

