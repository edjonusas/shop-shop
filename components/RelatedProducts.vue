<template>
  <div class="related-products">
    <h3>Related products</h3>
    <div>
      <product-cards :products="relatedProducts" />
    </div>
  </div>
</template>

<script>
import ProductCards from "./ProductCards.vue";
export default {
  components: { ProductCards },
  props: {
    relatedProducts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 36px;
  text-align: center;
  margin: 50px 0;
}

.related-products {
  padding-bottom: 50px;
}
</style>